import type { NavigateFunction } from "react-router-dom"

export namespace Keyboard {
  export interface BlankKey {
    type: "none"
  }

  export interface CharKey {
    type: "char"
    value: string
    selected?: boolean
  }

  interface CmdKeyAction<Type> {
    value: Type
    setter: React.Dispatch<React.SetStateAction<Type>>
  }

  interface CmdKeyTemplate {
    type: "cmd"
    value: string
    /** Material Symbols code */
    label: string
    selected?: boolean
  }
  export interface CmdKey extends CmdKeyTemplate {
    action: (prop: CmdKeyAction<string[]>) => void
  }

  export interface CmdLocationtKey extends CmdKeyTemplate {
    setter: "location"
    action: (navigate: NavigateFunction) => void
  }

  export interface CmdPositionKey extends CmdKeyTemplate {
    setter: "position"
    action: (prop: CmdKeyAction<Keyboard.KeyPosition>) => void
  }


  export interface CmdShiftKey extends CmdKeyTemplate {
    setter: "shift"
    action: (prop: CmdKeyAction<Keyboard.Caps>) => void
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
    keySpeed: number
    layout: Layout
    textValue: string[]
    setAutocomplete: React.Dispatch<React.SetStateAction<string[]>>
    setCaps: React.Dispatch<React.SetStateAction<Caps>>
    setCurrentKey: React.Dispatch<React.SetStateAction<KeyPosition>>
    setKeySpeed: React.Dispatch<React.SetStateAction<number>>
    setLayout: React.Dispatch<React.SetStateAction<Layout>>
    setTextValue: React.Dispatch<React.SetStateAction<string[]>>
  }

  export type Key =
    BlankKey |
    CharKey |
    CmdKey |
    CmdPositionKey |
    CmdLocationtKey |
    CmdShiftKey |
    NeutralKey
}