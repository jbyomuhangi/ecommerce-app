import Image from "next/image";
import React from "react";

interface ImageCellProps {
  url: string;
}

export const ImageCell: React.FC<ImageCellProps> = ({ url }) => {
  return (
    <div className="relative aspect-square h-[80px]">
      <Image className="rounded-md object-contain" src={url} fill alt="Image" />
    </div>
  );
};
