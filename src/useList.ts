import { useLocalStorage } from "usehooks-ts";

export type ListItem = {
  id: string;
  name: string;
  price: number;
  amount: number;
  total?: number;
};

export type List = ListItem[];

export function useList() {
  const [items, setItems, clearItems] = useLocalStorage<List>("items", []);

  function addItem(item: ListItem) {
    setItems([...items, { ...item }]);
  }

  function removeItem(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  function editItem(id: string, newItem: ListItem) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, ...newItem, total: newItem.price * newItem.amount }
          : item
      )
    );
  }

  const total = items
    ? items.reduce((acc, item) => acc + (item.total || 0), 0)
    : 0;

  console.log({ total });

  return {
    addItem,
    clearItems,
    editItem,
    items: items || [],
    removeItem,
    total,
  };
}
