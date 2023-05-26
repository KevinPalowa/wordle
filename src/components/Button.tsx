import { ButtonHTMLAttributes } from "react";

function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-gray-300 px-4 py-1 rounded-md ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
