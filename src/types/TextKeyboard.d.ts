export namespace Keyboard {
  export interface BlankKey {
    type: "none";
  }

  export interface CharKey {
    type: "char" ;
    value: string;
    selected?: boolean;
  }

  export interface CmdKey {
    type: "cmd" ;
    /** TODO: Define available commands */
    value: "prev" | "shift" | "backspace" | "autocomplete" |
    "none" | "space"  | "return" | "numpad" | "next";
    /** Material Symbols code */
    label: string;
    selected?: boolean;
  }

  export type KeyPosition = [x: number, y: number]

  export interface KeyboardContext {
    currentKey: KeyPosition;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }

  export type Key = BlankKey | CharKey | CmdKey;
}