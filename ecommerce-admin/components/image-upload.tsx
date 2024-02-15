"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import React from "react";

import { withClientSideMount } from "@/hoc/with-client-side-mount";
import { Button } from "./ui/button";

interface ImageUploadProps {
  value: string[];
  isDisabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUploadBase: React.FC<ImageUploadProps> = ({
  value,
  isDisabled,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: CldUploadWidgetResults) => {
    if (!result.info) return;
    if (typeof result.info === "string") return;
    onChange(result.info.secure_url);
  };

  return (
    <div>
      {value.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          {value.map((url) => {
            return (
              <div
                key={url}
                className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
              >
                <div className="absolute right-2 top-2 z-10">
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => onRemove(url)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <Image fill className="object-cover" src={url} alt="Image" />
              </div>
            );
          })}
        </div>
      )}

      <CldUploadWidget uploadPreset="qxal5wog" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              disabled={isDisabled}
              variant={"secondary"}
              onClick={() => open()}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export const ImageUpload = withClientSideMount(ImageUploadBase);
