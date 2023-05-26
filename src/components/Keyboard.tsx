import { useCallback, useEffect } from "react";
import Button from "./Button";

type Props = {
  onSubmit: (data: string) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};
function Keyboard({ onSubmit, setValue, value, disabled }: Props) {
  const handleKeyDown = useCallback(
    (event: string) => {
      setValue((prev) => {
        if (event === "Backspace") return prev.slice(0, -1);
        if (event === "Enter") {
          onSubmit(value);
          return "";
        }
        if (prev.length >= 5) return prev;
        if (event.length === 1) return prev + event;

        return prev;
      });
    },
    [onSubmit, setValue, value]
  );
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
      <div className="space-x-2 flex">
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
        <Button onClick={() => handleKeyDown("Enter")} disabled={disabled}>
          Enter
        </Button>
      </div>
    </div>
  );
}

export default Keyboard;
