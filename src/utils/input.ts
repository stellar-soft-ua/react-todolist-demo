import { KeyboardEventHandler } from "react";

const preventNumbers: KeyboardEventHandler<HTMLInputElement> = (event) => {
  if ("1234567890".indexOf(event.key) !== -1) {
    event.preventDefault();
  }
};

export { preventNumbers} ;
