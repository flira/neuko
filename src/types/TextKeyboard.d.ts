import type { NavigateFunction } from "react-router-dom"

/** Tipos usados no teclado da aplicação */
export namespace Keyboard {

  /** Espaço branco do teclado. */
  export interface BlankKey {
    type: "none"
  }

  /** Tecla de caracter. */
  export interface CharKey {
    type: "char"
    value: string
    selected?: boolean
  }

  /**
   * @internal
   * Tipo genérico de estado do react.
   */
  interface CmdKeyAction<Type> {
    value: Type
    setter: React.Dispatch<React.SetStateAction<Type>>
  }

  /**
   * @internal
   * Tipo base para outras teclas
   */
  interface CmdKeyTemplate {
    type: "cmd"
    value: string
    /** Material Symbols code */
    label: string
    selected?: boolean
  }

  /**
   * Tecla que altera valor de texto
   */
  export interface CmdKey extends CmdKeyTemplate {
    action: (prop: CmdKeyAction<string[]>) => void
  }

  /**
   * Tecla para navegação no app.
   */
  export interface CmdLocationtKey extends CmdKeyTemplate {
    setter: "location"
    action: (navigate: NavigateFunction) => void
  }

  /**
   * Tecla para navegação pelo teclado.
   */
  export interface CmdPositionKey extends CmdKeyTemplate {
    setter: "position"
    action: (prop: CmdKeyAction<Keyboard.KeyPosition>) => void
  }

  /**
   * Tecla para alterar entre caixa alta e caixa baixa.
   */
  export interface CmdShiftKey extends CmdKeyTemplate {
    setter: "shift"
    action: (prop: CmdKeyAction<Keyboard.Caps>) => void
  }

  /**
   * Tecla de respouso.
   */
  export interface NeutralKey {
    type: "neutral"
  }

  /**
   * Posição da tecla no teclado, onde
   * o primeiro item é a linha e a segunda a coluna
   * em relação à tecla neutra.
   */
  export type KeyPosition = [x: number, y: number]

  export type Layout = "navigation" | "numpad" | "text"

  /**
   * Controle da tecla `shift`.
   */
  export interface Caps {
    active: boolean
    locked: boolean
  }

  /** Todos os estados e setters do teclado */
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

    /** Usado para autocomplete com localstorage */
  export interface localPrediction {
    /** Texto. */
    value: string
    /** Número de vezes que foi utilizado. */
    timesUsed: number
  }
}