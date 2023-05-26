import clsx from "clsx";
import { ReactNode } from "react";

type Props = { children?: ReactNode; variant?: "success" | "error" | "base" };
export function WordBox({ children, variant = "base" }: Props) {
  const colorVariant = clsx({
    "bg-green-300": variant === "success",
    "bg-red-200": variant === "error",
    "bg-gray-200": variant === "base",
  });
  return (
    <div
      className={`${colorVariant} h-12 rounded-md flex items-center justify-center font-bold text-xl uppercase`}
    >
      {children}
    </div>
  );
}
