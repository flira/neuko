import { createContext, useContext, useState } from "react"
import type { Keyboard } from "src/types"

const defaultCaps: Keyboard.Caps = {active: false, locked: false};
const defaultLayout: Keyboard.Layout = "navigation"

const KeyboardContext = createContext<Keyboard.KeyboardContext>({
  caps: defaultCaps,
  currentKey: [0, 0],
  layout: defaultLayout,
  setCaps: () => defaultCaps,
  setCurrentKey: () => "",
  setLayout: () => defaultLayout,
  setTextValue: () => "",
  textValue: ""
});
export const useKeyboardContext = () => useContext(KeyboardContext);

export default function ({ children }: React.HTMLProps<Element>) {
  const [caps, setCaps] = useState(defaultCaps)
  const [currentKey, setCurrentKey] = useState([0, 0] as Keyboard.KeyPosition)
  const [layout, setLayout] = useState(defaultLayout)
  const [textValue, setTextValue] = useState("")

  return (
    <KeyboardContext.Provider value={{
      caps,
      currentKey,
      layout,
      textValue,
      setCaps,
      setCurrentKey,
      setLayout,
      setTextValue
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}