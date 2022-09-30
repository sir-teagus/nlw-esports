import { MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] py-6 px-8 flex justify-between items-center">
        <div>
          <strong className="font-black text-2xl text-white block">
            Não encontrou o seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
