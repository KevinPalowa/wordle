import { useCallback, useEffect, useRef } from "react";
import Button from "./Button";

type Props = {
  onSubmit: (data: string) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};
function Keyboard({ onSubmit, setValue, value, disabled }: Props) {
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const handleKeyDown = useCallback(
    (event: string) => {
      setValue((prev) => {
        switch (event) {
          case "Backspace":
            return prev.slice(0, -1);
          case "Enter":
            onSubmit(value);
            return "";
          default:
            if (prev.length >= 5 || event.length !== 1) {
              return prev;
            }
            return prev + event;
        }
      });
    },
    [onSubmit, setValue, value]
  );
  useEffect(() => {
    if (value.length === 5 && enterButtonRef.current) {
      enterButtonRef.current.focus();
    }
  }, [value.length]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isKeyAlphabet = !event.code.includes("Digit");
      if (isKeyAlphabet && !disabled) return handleKeyDown(event.key);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, handleKeyDown]);
  return (
    <div className="space-y-2">
      <div className="space-x-2 flex">
        {"qwertyuiop".split("").map((alphabet) => (
          <Button
            className={`flex-1 uppercase`}
            onClick={() => handleKeyDown(alphabet)}
            key={alphabet}
            disabled={disabled}
          >
            {alphabet}
          </Button>
        ))}
        <Button
          className={`flex-1`}
          onClick={() => handleKeyDown("Backspace")}
          disabled={disabled}
        >
          Backspace
        </Button>
      </div>

      <div className="space-x-2 flex">
        {"asdfghjkl".split("").map((alphabet) => (
          <Button
            className={`flex-1 uppercase`}
            disabled={disabled}
            onClick={() => handleKeyDown(alphabet)}
            key={alphabet}
          >
            {alphabet}
          </Button>
        ))}
      </div>
      <div className="space-x-2 flex w-full">
        {"zxcvbnm".split("").map((alphabet) => (
          <Button
            disabled={disabled}
            className={`flex-1 uppercase`}
            onClick={() => handleKeyDown(alphabet)}
            key={alphabet}
          >
            {alphabet}
          </Button>
        ))}
        <Button
          onClick={() => handleKeyDown("Enter")}
          disabled={disabled}
          ref={enterButtonRef}
          className="flex-1"
        >
          Enter
        </Button>
      </div>
    </div>
  );
}

export default Keyboard;
