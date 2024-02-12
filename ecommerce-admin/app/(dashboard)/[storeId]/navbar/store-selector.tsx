"use client";

import { Store } from "@prisma/client";
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
  stores?: Store[];
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
  stores = [],
}) => {
  const params = useParams<{ storeId: string }>();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const createStoreModalStore = useCreateStoreModalStore();

  const storeOptions = useMemo(
    () => stores.map((store) => ({ value: store.id, label: store.name })),
    [stores],
  );

  const selectedStoreOption = useMemo(
    () => storeOptions.find((store) => store.value === params.storeId),
    [storeOptions, params.storeId],
  );

  const onSelectStore = (storeOption: { label: string; value: string }) => {
    setIsOpen(false);
    router.push(`/${storeOption.value}`);
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
          {selectedStoreOption?.label}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store... " />

            <CommandEmpty>No Store found</CommandEmpty>

            <CommandGroup heading="Stores">
              {storeOptions.map((store) => {
                const isSelected = selectedStoreOption?.value === store.value;

                return (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onSelectStore(store)}
                  >
                    <StoreIcon className={"mr-2 h-4 w-4"} />
                    {store.label}
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
              <CommandItem onSelect={handleCreateNewStore}>
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
