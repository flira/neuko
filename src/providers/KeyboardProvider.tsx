import { createContext, useContext, useState } from "react"
import type { Keyboard } from "@/types"

const defaultCaps: Keyboard.Caps = { active: false, locked: false }
const defaultLayout: Keyboard.Layout = "navigation"
const defaultKeySpeed = 1250

const KeyboardContext = createContext<Keyboard.KeyboardContext>({
  autocomplete: [],
  caps: defaultCaps,
  currentKey: [0, 0],
  keySpeed: defaultKeySpeed,
  layout: defaultLayout,
  setAutocomplete: () => [],
  textValue: [""],
  setCaps: () => defaultCaps,
  setCurrentKey: () => "",
  setKeySpeed: () => 0,
  setLayout: () => defaultLayout,
  setTextValue: () => [""],
})

export const useKeyboardContext = () => useContext(KeyboardContext)

export default function ({ children }: {children: React.ReactNode}) {
  const [caps, setCaps] = useState<Keyboard.Caps>(defaultCaps)
  const [currentKey, setCurrentKey] = useState<Keyboard.KeyPosition>([0, 0])
  const [keySpeed, setKeySpeed] = useState(defaultKeySpeed)
  const [layout, setLayout] = useState<Keyboard.Layout>(defaultLayout)
  const [textValue, setTextValue] = useState<string[]>([""])
  const [autocomplete, setAutocomplete] = useState<string[]>([])

  return (
    <KeyboardContext.Provider value={{
      autocomplete,
      caps,
      currentKey,
      keySpeed,
      layout,
      textValue,
      setAutocomplete,
      setCaps,
      setCurrentKey,
      setKeySpeed,
      setLayout,
      setTextValue
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}