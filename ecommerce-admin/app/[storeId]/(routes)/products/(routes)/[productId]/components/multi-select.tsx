"use client";

import { ChevronDownIcon, CircleXIcon } from "lucide-react";
import React, { useMemo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OptionType = { label: string; value: string };

interface MultiSelectInputProps {
  value: string[];
  options: OptionType[];
  disabled?: boolean;
  onAddItem: (value: string) => void;
  onRemoveItem: (value: string) => void;
}

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  value,
  options,
  disabled,
  onAddItem,
  onRemoveItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { availableOptions, selectedOptions } = useMemo(() => {
    const valueSet = new Set(value);

    const availableOptions: OptionType[] = [];
    const selectedOptions: OptionType[] = [];

    options.forEach((option) => {
      if (!valueSet.has(option.value)) {
        availableOptions.push(option);
      } else {
        selectedOptions.push(option);
      }
    });

    return { availableOptions, selectedOptions };
  }, [options, value]);

  const onClickSelectedOption = (event: React.MouseEvent, value: string) => {
    event.stopPropagation();
    onRemoveItem(value);
  };

  const hasValues = selectedOptions.length > 0;

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="flex h-[40px] w-full items-center overflow-hidden rounded-md border border-input">
            <div className="flex flex-1 items-center overflow-hidden px-3">
              <div className="scrollbar-hidden flex flex-1 gap-2 overflow-auto">
                {!hasValues && (
                  <p className="text-muted-foreground">Select option</p>
                )}
                {selectedOptions.map((option) => {
                  return (
                    <div
                      key={option.value}
                      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-2"
                      onClick={(event) =>
                        onClickSelectedOption(event, option.value)
                      }
                    >
                      <p>{option.label}</p>
                      <CircleXIcon className="h-4 w-4 shrink-0" />
                    </div>
                  );
                })}
              </div>

              <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="max-h-[200px] w-full overflow-auto p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No Options</CommandEmpty>

              <CommandGroup>
                {availableOptions.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => onAddItem(option.value)}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
