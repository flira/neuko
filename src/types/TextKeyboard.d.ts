export namespace Keyboard {
  export interface BlankKey {
    type: "none"
  }

  export interface CharKey {
    type: "char"
    value: string
    selected?: boolean
  }

  interface CmdKeyAction<Type>  {
    value: Type
    setter?: React.Dispatch<React.SetStateAction<Type>>
  }

  export interface CmdKey {
    type: "cmd"
    action: (cmdKeyAction: CmdKeyAction<Type>) => void
    /** TODO: Define available commands */
    value: "prev" | "shift" | "backspace" | "autocomplete" | "space" | "return" | "numpad" | "next"
    /** Material Symbols code */
    label: string
    selected?: boolean
  }

  export interface NeutralKey {
    type: "neutral"
  }

  export type KeyPosition = [x: number, y: number]

  export type Layout = "navigation" | "numpad" | "text"

  export interface Caps {
    active: boolean
    locked: boolean
  }
  export interface KeyboardContext {
    autocomplete: string[]
    caps: Caps
    currentKey: KeyPosition
    layout: Layout
    textValue: string
    setAutocomplete: React.Dispatch<React.SetStateAction<string[]>>
    setCaps: React.Dispatch<React.SetStateAction<Caps>>
    setCurrentKey: React.Dispatch<React.SetStateAction<KeyPosition>>
    setLayout: React.Dispatch<React.SetStateAction<Layout>>
    setTextValue: React.Dispatch<React.SetStateAction<string>>
  }

  export type Key = BlankKey | CharKey | CmdKey | NeutralKey
}