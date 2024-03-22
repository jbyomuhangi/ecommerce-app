import Image from "next/image";
import React from "react";

interface ImageCellProps {
  url: string;
}

export const ImageCell: React.FC<ImageCellProps> = ({ url }) => {
  return (
    <Image
      className="rounded-md object-contain"
      src={url}
      width={100}
      height={100}
      alt="Image"
    />
  );
};
