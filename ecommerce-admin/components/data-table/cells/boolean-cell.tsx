import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import React from "react";

interface BooleanCellProps {
  value: boolean;
}

export const BooleanCell: React.FC<BooleanCellProps> = ({ value }) => {
  if (value) {
    return <CircleCheckIcon className="text-green-500" />;
  }

  return <CircleXIcon className="text-red-500" />;
};
