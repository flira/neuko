import keyExists from "@/utils/keyExists"
import HTML_IDS from "@/const/HTML_IDS"
import localPredictions from "@/utils/localPredictions"
import type { Keyboard } from "@/types"

const textKeys: Keyboard.Key[][] = []

textKeys.push( // linha 1
  [
    { type: "none" },
    { type: "none" },
    { type: "none" },
    { type: "char", value: "z" },
    { type: "char", value: "r" },
    { type: "char", value: "b" },
    { type: "none" },
    { type: "none" },
    { type: "none" },
  ]
)

textKeys.push( // linha 2
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "w" },
    { type: "char", value: "l" },
    { type: "char", value: "o" },
    { type: "char", value: "t" },
    { type: "char", value: "x" },
    { type: "none" },
    { type: "none" },
  ]
)


textKeys.push( // linha 3
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "h" },
    { type: "char", value: "m" },
    { type: "char", value: "a" },
    { type: "char", value: "n" },
    { type: "char", value: "v" },
    { type: "none" },
    { type: "none" },
  ]
)


textKeys.push( // linha 4
  [
    {
      type: "cmd",
      setter: "location",
      value: "home",
      label: "home",
      action: (navigate) => navigate("/")
    },
    {
      type: "cmd",
      value: "undo",
      label: "undo",
      action: ({ value, setter }: Keyboard.CmdKeyAction<string[]>) => {
        const cp = [...value]
        if (cp.length > 1) cp.pop()
        setter(cp)
      }
    },
    {
      type: "cmd",
      value: "backspace",
      label: "backspace",
      action: ({ value, setter }: Keyboard.CmdKeyAction<string[]>) => {
        const lastEntry = [...value].pop()
        const newEntry = lastEntry ?
          lastEntry.substring(0, lastEntry.length - 1) : ""
        setter([...value, newEntry])
      }
    },
    {
      type: "cmd",
      setter: "position",
      value: "autocomplete",
      label: "format_list_numbered",
      action: ({ setter }: Keyboard.CmdKeyAction<Keyboard.KeyPosition>) => {
        if (!document.getElementById(HTML_IDS.AUTOCOMPLETE_LIST)) {
          setter([0, 0])
          return
        }
        const newKey: Keyboard.KeyPosition = [0, 20]
        if (!keyExists(newKey)) {
          while (!keyExists(newKey)) {
            --newKey[1]
          }
        }
        setter(newKey)
      }
    },
    { type: "neutral" },
    {
      type: "cmd",
      value: "space",
      label: "space_bar",
      action: ({ value, setter }: Keyboard.CmdKeyAction<string[]>) => {
        const lastEntry = [...value].pop()
        const newEntry = lastEntry ? `${lastEntry} ` : " "
        setter([...value, newEntry])
      }
    },
    {
      type: "cmd",
      value: "return",
      label: "keyboard_return",
      action: ({ value, setter }: Keyboard.CmdKeyAction<string[]>) => {
        const lastEntry = [...value].pop()
        if (!lastEntry) return
        const lp = localPredictions()
        lp.store(lastEntry)
        setter([""])
      }
    },
    {
      type: "cmd",
      setter: "shift",
      value: "shift",
      label: "shift",
      action: ({ value: { active, locked }, setter }:
        Keyboard.CmdKeyAction<Keyboard.Caps>) => {
        if (!active && !locked) {
          setter({ active: true, locked: false })
        } else if (active && !locked) {
          setter({ active: true, locked: true })
        } else {
          setter({ active: false, locked: false })
        }
      }
    },
    {
      type: "cmd",
      value: "numpad",
      label: "123",
      action: () => { return }
    },

  ]
)

textKeys.push( // linha 5
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "q" },
    { type: "char", value: "u" },
    { type: "char", value: "e" },
    { type: "char", value: "d" },
    { type: "char", value: "g" },
    { type: "none" },
    { type: "none" },
  ]
)

textKeys.push( // linha 6
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "y" },
    { type: "char", value: "p" },
    { type: "char", value: "s" },
    { type: "char", value: "c" },
    { type: "char", value: "k" },
    { type: "none" },
    { type: "none" },
  ]
)


textKeys.push( // linha 7
  [
    { type: "none" },
    { type: "none" },
    { type: "none" },
    { type: "char", value: "j" },
    { type: "char", value: "i" },
    { type: "char", value: "f" },
    { type: "none" },
    { type: "none" },
    { type: "none" },
  ]
)

export default textKeys