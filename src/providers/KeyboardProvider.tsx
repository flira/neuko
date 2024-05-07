import { createContext, useContext, useState } from "react"
import type { Keyboard } from "src/types"

const defaultCaps: Keyboard.Caps = { active: false, locked: false };
const defaultLayout: Keyboard.Layout = "navigation"

const KeyboardContext = createContext<Keyboard.KeyboardContext>({
  autocomplete: [],
  caps: defaultCaps,
  currentKey: [0, 0],
  layout: defaultLayout,
<<<<<<< HEAD
  setAutocomplete: () => [],
=======
  textValue: "",
>>>>>>> 537f81c (perf: refatoração do teclado)
  setCaps: () => defaultCaps,
  setCurrentKey: () => "",
  setLayout: () => defaultLayout,
  setTextValue: () => [],
});

export const useKeyboardContext = () => useContext(KeyboardContext);

export default function ({ children }: React.HTMLProps<Element>) {
  const [caps, setCaps] = useState<Keyboard.Caps>(defaultCaps)
  const [currentKey, setCurrentKey] = useState<Keyboard.KeyPosition>([0, 0])
  const [layout, setLayout] = useState<Keyboard.Layout>(defaultLayout)
  const [textValue, setTextValue] = useState<string>("")
  const [autocomplete, setAutocomplete] = useState<string[]>([])

  return (
    <KeyboardContext.Provider value={{
      autocomplete,
      caps,
      currentKey,
      layout,
      textValue,
      setAutocomplete,
      setCaps,
      setCurrentKey,
      setLayout,
      setTextValue
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}