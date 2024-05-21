import { createContext, useContext, useState } from "react"
import KEYBOARD from "@/const/KEYBOARD"
import type { Keyboard } from "@/types"

const { DEFAULT_CAPS, DEFAULT_LAYOUT, DEFAULT_SPEED, SPEED_ID: KEY_SPEED } = KEYBOARD

/** Key Speed */
const ks = +(localStorage.getItem(KEY_SPEED) ?? DEFAULT_SPEED)

const KeyboardContext = createContext<Keyboard.KeyboardContext>({
  autocomplete: [],
  caps: DEFAULT_CAPS,
  currentKey: [0, 0],
  keySpeed: ks,
  layout: DEFAULT_LAYOUT,
  setAutocomplete: () => [],
  textValue: [""],
  setCaps: () => DEFAULT_CAPS,
  setCurrentKey: () => "",
  setKeySpeed: () => 0,
  setLayout: () => DEFAULT_LAYOUT,
  setTextValue: () => [""],
})

export const useKeyboardContext = () => useContext(KeyboardContext)

export default function ({ children }: { children: React.ReactNode }) {
  const [caps, setCaps] = useState<Keyboard.Caps>(DEFAULT_CAPS)
  const [currentKey, setCurrentKey] = useState<Keyboard.KeyPosition>([0, 0])
  const [keySpeed, setKeySpeed] = useState(ks)
  const [layout, setLayout] = useState<Keyboard.Layout>(DEFAULT_LAYOUT)
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