import { ButtonHTMLAttributes, forwardRef, ForwardedRef } from "react";

const Button = forwardRef(function Button(
  { className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={`bg-gray-300 px-4 py-1 rounded-md ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
});

export default Button;
