import { IListItem } from "@/types";
import React, { useState, useEffect } from "react";
import { CustomInput as Input } from "../input";
import { stringContains } from "@/lib/utils";
import { CustomButton as Button } from "../button";
import Radio from "./Radio";
import { PopoverClose } from "@radix-ui/react-popover";
import { Icon } from "../../Icon";
import { RadioGroup } from "../../radio-group";

interface RadioItemOptionsProps {
  items: Array<IListItem>;
  defaultSelectedItems?: IListItem;
  selectedItem?: string;
  onSubmit?: (value: string | null) => void;
  addButtonText?: string;
  searchPlaceholder?: string;
  showSearchBox?: boolean;
  showAddNewItemButton?: boolean;
  showAddCloseButton?: boolean;
}

const RadioItems = ({
  items,
  showSearchBox,
  searchPlaceholder,
  onSubmit,
  addButtonText,
  ...props
}: Omit<React.ComponentProps<typeof RadioGroup>, "onSubmit"> & RadioItemOptionsProps) => {
  // Track temporary selection until Apply is clicked
  const [tempValue, setTempValue] = useState(props.selectedItem);
  const [searchValue, setSearchValue] = useState("");
  const [renderedItems, setRenderedItems] = useState(items);

  // Update tempValue when selectedItem prop changes
  useEffect(() => {
    setTempValue(props.selectedItem);
  }, [props.selectedItem]);

  const handleSearch = (searchBy: string) => {
    if (!searchBy) setRenderedItems(items);
    else {
      const searchedItems = items.filter(({ label }) => stringContains(label, searchBy));
      setRenderedItems(searchedItems);
    }
    setSearchValue(searchBy);
  };

  const handleApply = () => {
    onSubmit?.(tempValue ?? null);
  };

  const handleCancel = () => {
    setTempValue(props.selectedItem); // Reset to original value
    onSubmit?.(null);
  };

  return (
    <RadioGroup
      value={tempValue}
      onValueChange={(value) => {
        setTempValue(value);
        // No longer calling onSubmit here, will wait for Apply button
      }}
      className="w-full"
      {...props}
    >
      {showSearchBox && (
        <div className="flex flex-col gap-2">
          <Input
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            slotAfter={<Icon name="arrow-down" height={16} width={16} />}
          />
        </div>
      )}
      <div className="flex flex-col items-start gap-2 max-h-[200px] overflow-y-auto w-full">
        {renderedItems.map((item, i) => (
          <span key={i} className="w-full px-2 py-1 rounded-md hover:bg-ctm-primary-100">
            <div className="w-full min-w-[250px]">
              <Radio value={item.value} label={item.label} />
            </div>{" "}
          </span>
        ))}
      </div>
      <div className="border-t border-ctm-secondary-50 p-2 flex justify-between items-center gap-2">
        <PopoverClose>
          <Button onClick={handleApply} variant={"ctm-primary"}>
            {addButtonText ?? "Apply"}
          </Button>
        </PopoverClose>
        <PopoverClose>
          <Button onClick={handleCancel} variant={"ctm-outline"}>
            Cancel
          </Button>
        </PopoverClose>
      </div>
    </RadioGroup>
  );
};

export default RadioItems;
