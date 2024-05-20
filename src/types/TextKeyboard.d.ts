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

  interface ActionParams extends KeyboardContext {
    navigate: NavigateFunction
  }

  export interface KeyLabelOptions {
    label?: string;
    fill?: boolean;
  }
  export interface KeyLabel {
    shift?: KeyLabelOptions
    caps?: KeyLabelOptions
  }
  /**
   * Tipo base para outras teclas
   */
  export interface CmdKey {
    action: (params: ActionParams) => void
    type: "cmd"
    /** Material Symbols code */
    label: string
    selected?: boolean
    /** Permite labels diferentes para */ 
    value?: KeyLabel
    /** Não reposiciona o cursor para a tecla neutra após ativada */
    skipKeyReset?: boolean
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

  export type Key = BlankKey | CharKey | CmdKey | NeutralKey

  /** Usado para autocomplete com localstorage */
  export interface localPrediction {
    /** Texto. */
    value: string
    /** Número de vezes que foi utilizado. */
    timesUsed: number
  }
}