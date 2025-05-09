import { useCallback, useMemo, useRef, useState } from "react";

export const useCheckItems = <T>(
  initialItems: Array<T>,
  defaultSelectedItems?: Array<T>,
  itemKey?: keyof T
) => {
  const key = useRef(itemKey);
  const [checkedItems, setCheckedItems] = useState<Array<Omit<T, "checked">>>(
    defaultSelectedItems ?? []
  );
  const [updateItem, setUpdateItem] = useState<T & { checked?: boolean }>();

  const items = useMemo(() => {
    const checkedKeys = checkedItems.map(
      ({ [itemKey ?? "value"]: keyValue }) => keyValue as unknown
    );

    return (Array.isArray(initialItems) ? initialItems : []).map((item) => ({
      ...item,
      checked: checkedKeys.includes((item as T)[(itemKey as keyof T) ?? "value"]),
    }));
  }, [checkedItems, initialItems, itemKey]);

  const itemToggle = useCallback(
    (searchValue: unknown, checkState?: boolean) => {
      if (!key.current) return;

      const _formikItems = [...items];
      const foundItem = _formikItems.find((item) => item[key.current!] === searchValue);
      if (foundItem) foundItem.checked = checkState ?? !foundItem.checked;

      setUpdateItem({ ...(foundItem as T), checked: checkState ?? !foundItem?.checked });

      setCheckedItems(
        _formikItems
          .filter(({ checked }) => checked)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ checked, ...restProps }) => ({ ...restProps }))
      );
    },
    [items, key]
  );

  const clearCheckedItems = () => {
    setCheckedItems([]);
  };

  const setKey = (newKey: keyof T) => (key.current = newKey);

  return { allItems: items, itemToggle, checkedItems, updateItem, setKey, clearCheckedItems };
};
