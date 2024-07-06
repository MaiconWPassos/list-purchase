import { useList } from "@/useList";
import { formatToBRL } from "@/utils/string";
import { MdDeleteSweep } from "react-icons/md";
import ToggleButton from "../BtnToggleTheme";
import { Button } from "../ui/button";

export default function Header() {
  const { total, clearItems } = useList();

  return (
    <div className="p-4 flex items-center w-full justify-between  bg-gradient-to-r from-fuchsia-500 to-cyan-500  dark:from-zinc-900 dark:to-zinc-900">
      <p className="font-display font-bold text-3xl text-white dark:text-indigo">
        {formatToBRL(total.toString())}
      </p>

      <div className="flex items-center">
        <ToggleButton className="bg-transparent text-white text-xl" />
        <Button
          className="bg-transparent text-white text-xl shadow-none"
          onClick={() =>
            confirm("Tem certeza que deseja limpar a lista?") && clearItems()
          }
        >
          <MdDeleteSweep />
        </Button>
      </div>
    </div>
  );
}
