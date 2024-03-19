"use client";

import {
  Check,
  ChevronDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateStoreModalStore } from "@/hooks/use-create-store-modal-store";
import { cn } from "@/lib/utils";

interface StoreSelectorProps {
  stores?: { id: string; name: string }[];
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
  stores = [],
}) => {
  const params = useParams<{ storeId: string }>();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const createStoreModalStore = useCreateStoreModalStore();

  const selectedStore = useMemo(
    () => stores.find((store) => store.id === params.storeId),
    [stores, params.storeId],
  );

  const onSelectStore = (store: { id: string; name: string }) => {
    setIsOpen(false);
    router.push(`/${store.id}`);
  };

  const handleCreateNewStore = () => {
    setIsOpen(false);
    createStoreModalStore.onOpen();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-[200px] justify-between gap-2"
        >
          <StoreIcon className="h-4 w-4" />
          {selectedStore?.name}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store... " />

            <CommandEmpty>No Store found</CommandEmpty>

            <CommandGroup heading="Stores">
              {stores.map((store) => {
                const isSelected = selectedStore?.id === store.id;

                return (
                  <CommandItem
                    key={store.id}
                    className="cursor-pointer"
                    onSelect={() => onSelectStore(store)}
                  >
                    <StoreIcon className={"mr-2 h-4 w-4"} />
                    {store.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={handleCreateNewStore}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
