import { useEffect, useState } from "react";
import Button from "./Button";

function Keyboard() {
  const [keyPressed, setKeyPressed] = useState("");
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Handle the keypress event here
      setKeyPressed(event.key);
    };

    // Add the keypress event listener when the component mounts
    window.addEventListener("keypress", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  console.log(keyPressed);
  return (
    <div className="space-y-2">
      <div className="space-x-2 flex">
        {"qwertyuiop".split("").map((alphabet) => (
          <Button
            className={`flex-1 ${
              keyPressed === alphabet && "border border-black"
            }`}
          >
            {alphabet.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="space-x-2 flex">
        {"asdfghjkl".split("").map((alphabet) => (
          <Button
            className={`flex-1 ${
              keyPressed === alphabet && "border border-black"
            }`}
          >
            {alphabet.toUpperCase()}
          </Button>
        ))}
      </div>
      <div className="space-x-2 flex">
        {"zxcvbnm".split("").map((alphabet) => (
          <Button
            className={`flex-1 ${
              keyPressed === alphabet && "border border-black"
            }`}
          >
            {alphabet.toUpperCase()}
          </Button>
        ))}
        <Button>ENTER</Button>
      </div>
    </div>
  );
}

export default Keyboard;
