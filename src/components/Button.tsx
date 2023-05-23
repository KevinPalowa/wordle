import { ButtonHTMLAttributes } from "react";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`bg-gray-300 px-4 py-1 rounded-md ${props.className}`}>
      {props.children}
    </button>
  );
}

export default Button;
