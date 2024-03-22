import React from "react";

interface ColorCellProps {
  color: string;
}

export const ColorCell: React.FC<ColorCellProps> = ({ color }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full border p-2"
        style={{ backgroundColor: color }}
      />

      <div>{color}</div>
    </div>
  );
};
