import { useCheckItems } from "@/hooks/useCheckItems";
import { IListItem } from "@/types";
import React, { useEffect, useState } from "react";
import { CustomInput as Input } from "../input";
import { stringContains } from "@/lib/utils";
import { CustomButton as Button } from "../button";
import Checkbox from "./Checkbox";
import { PopoverClose } from "@radix-ui/react-popover";
import { Icon } from "../../Icon";

interface CheckboxItemOptionsProps {
  items: Array<IListItem>;
  defaultSelectedItems?: Array<IListItem>;
  selectedItems?: Array<IListItem>;
  onSubmit?: (value: Array<IListItem>) => void;
  /** Passing this, implies updating check items won't be handled by this component */
  //   onCheckboxToggle?: (item: ILi, checkedItems: Array<CheckboxOptionsItemChildren>) => void;
  addButtonText?: string;
  searchPlaceholder?: string;
  //   onAddNewValue?: (value: string) => void;
  //   onRemoveItem?: (id: string, labelName: string) => void;
  showSearchBox?: boolean;
  showAddNewItemButton?: boolean;
  showAddCloseButton?: boolean;
}

const CheckboxItems = ({ ...props }: CheckboxItemOptionsProps) => {
  const { allItems, itemToggle, checkedItems, clearCheckedItems } = useCheckItems(
    props.items,
    props.selectedItems ?? props.defaultSelectedItems,
    "value"
  );
  const [searchValue, setSearchValue] = useState("");
  const [renderedItems, setRenderedItems] = useState(allItems);
  const handleSearch = (searchBy: string) => {
    if (!searchBy) setRenderedItems(allItems);
    else {
      const searchedItems = allItems.filter(({ label }) => stringContains(label, searchBy));
      setRenderedItems(searchedItems);
    }
    setSearchValue(searchBy);
  };
  useEffect(() => {
    setRenderedItems(allItems);
  }, [allItems]);
  return (
    <div className="flex flex-col gap-3">
      {props.showSearchBox && (
        <div className="flex flex-col gap-2">
          <Input
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={props.searchPlaceholder}
            slotAfter={<Icon name="arrow-down" height={16} width={16} />}
          />
        </div>
      )}
      <div className="flex flex-col items-start gap-2 max-h-[200px] overflow-y-auto">
        {renderedItems.map((item, i) => (
          <span key={i} className="w-full px-2 py-1 rounded-md hover:bg-ctm-primary-100">
            <Checkbox
              checked={item.checked}
              label={item.label}
              onCheckedChange={(checked) => {
                console.log(checked, Boolean(checked));
                itemToggle(item.value, Boolean(checked));
              }}
            />
          </span>
        ))}
      </div>
      <div className="border-t border-ctm-secondary-50 p-2 flex justify-between items-center gap-2">
        <PopoverClose>
          <Button onClick={() => props.onSubmit?.(checkedItems)} variant={"ctm-primary"}>
            {props.addButtonText ?? "Apply"}
          </Button>
        </PopoverClose>
        <PopoverClose>
          <Button
            onClick={() => {
              clearCheckedItems();
              props.onSubmit?.([]);
            }}
            variant={"ctm-outline"}
          >
            Cancel
          </Button>
        </PopoverClose>
      </div>
    </div>
  );
};

export default CheckboxItems;
