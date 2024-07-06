import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import Header from "./components/Header";
import { Button } from "./components/ui/button";
import { Input, InputAsChildren } from "./components/ui/input";
import { ListItem, useList } from "./useList";
import IntlCurrencyInput from "react-intl-currency-input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

function RenderItem({ item }: { item: ListItem }) {
  const { editItem, removeItem } = useList();

  return (
    <div className="p-4 bg-violet-50 dark:bg-zinc-950 rounded-lg flex flex-col gap-2 relative ">
      <Button
        variant="destructive"
        className="absolute -right-1 -top-1 rounded-full p-0 w-10"
        onClick={() =>
          confirm(`Tem certeza que deseja remover ${item.name} da lista?`) &&
          removeItem(item.id)
        }
      >
        <LuTrash />
      </Button>
      <Input
        type="text"
        placeholder="Nome do produto"
        value={item.name}
        onChange={(e) => editItem(item.id, { ...item, name: e.target.value })}
      />

      <div className="flex items-center justify-between gap-2">
        <InputAsChildren>
          <IntlCurrencyInput
            currency="BRL"
            config={{
              locale: "pt-BR",
              formats: {
                number: {
                  BRL: {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                },
              },
            }}
            onChange={(_, value) =>
              editItem(item.id, { ...item, price: value })
            }
            defaultValue={item.price}
            max={100 * 10000000}
          />
        </InputAsChildren>
        <div className="flex items-center justify-between gap-2">
          <p className="font-light">Qtd:</p>

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              item.amount > 0
                ? editItem(item.id, { ...item, amount: item.amount - 1 })
                : null
            }
          >
            <LuMinus />
          </Button>
          <Input type="number" className="w-9" value={item.amount} />
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              editItem(item.id, { ...item, amount: item.amount + 1 })
            }
          >
            <LuPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { items, addItem } = useList();
  const [search, setSearch] = useState(``);

  const searchItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen  relative  bg-gradient-to-r from-fuchsia-500 to-cyan-500 dark:from-zinc-900 dark:to-zinc-900">
      <Header />

      {items.length > 3 && (
        <div className="p-4">
          <Input
            placeholder="Pesquisar..."
            className="placeholder:text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <ScrollArea className="max-h-[calc(100vh-68px)] overflow-auto w-full flex flex-col gap-4 rounded-md p-4">
        {searchItems.map((item, index) => (
          <RenderItem item={item} key={index} />
        ))}
      </ScrollArea>

      <Button
        onClick={() =>
          addItem({ id: crypto.randomUUID(), name: "", price: 0, amount: 1 })
        }
        className="bg-gradient-to-r from-violet-700 to-purple-500  dark:from-zinc-700 dark:to-zinc-700  text-white text-xl rounded-full w-12 h-12 p-0 fixed right-4 bottom-4"
      >
        <LuPlus />
      </Button>
    </div>
  );
}

export default App;
