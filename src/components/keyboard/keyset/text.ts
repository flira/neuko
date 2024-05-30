import keyExists from "@/utils/keyExists"
import KEYBOARD from "@/const/KEYBOARD"
import PREDICTIONS from "@/const/PREDICTIONS"
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
      label: "home",
      action: ({ navigate }) => navigate("/")
    },
    {
      type: "cmd",
      label: "undo",
      action: ({ textValue, setTextValue }) => {
        const cp = [...textValue]
        if (cp.length > 1) cp.pop()
        setTextValue(cp)
      }
    },
    {
      type: "cmd",
      label: "backspace",
      value: {
        shift: {
          fill: true
        },
        caps: {
          fill: true,
          label: "delete_forever"
        }
      },
      action: ({ caps: { active, locked }, textValue, setCaps, setTextValue }) => {
        const lastEntry = [...textValue].pop() ?? ""
        let newEntry = ""
        if (!active && !locked) {
          newEntry = lastEntry.substring(0, lastEntry.length - 1)
        } else if (locked) {
          newEntry = ""
        } else {
          newEntry = lastEntry.replace(/[\w]+\s*$/, "")
        }
        setTextValue([...textValue, newEntry])
        setCaps({ active: false, locked: false })
      }
    },
    {
      type: "cmd",
      label: "format_list_numbered",
      skipKeyReset: true,
      action: ({ setCurrentKey }) => {
        if (!document.getElementById(PREDICTIONS.HTML_ID)) {
          setCurrentKey([0, 0])
          return
        }
        const newKey: Keyboard.KeyPosition =
          [KEYBOARD.LIMIT, KEYBOARD.LIMIT]
        if (!keyExists(newKey)) {
          while (!keyExists(newKey)) {
            --newKey[1]
          }
        }
        setCurrentKey(newKey)
      }
    },
    { type: "neutral" },
    {
      type: "cmd",
      label: "space_bar",
      action: ({ textValue, setTextValue }) => {
        const lastEntry = [...textValue].pop()
        const newEntry = lastEntry ? `${lastEntry} ` : " "
        setTextValue([...textValue, newEntry])
      }
    },
    {
      type: "cmd",
      label: "shift",
      value: {
        shift: {
          fill: true
        },
        caps: {
          fill: true,
          label: "shift_lock"
        }
      },
      action: ({ caps: { active, locked }, setCaps }) => {
        if (!active && !locked) {
          setCaps({ active: true, locked: false })
        } else if (active && !locked) {
          setCaps({ active: true, locked: true })
        } else {
          setCaps({ active: false, locked: false })
        }
      }
    },
    {
      type: "cmd",
      label: "archive",
      action: ({ textValue, setTextValue }) => {
        const lastEntry = [...textValue].pop()
        if (!lastEntry) return
        const lp = localPredictions()
        lp.store(lastEntry)
        setTextValue([""])
      }
    },
    {
      type: "cmd",
      label: "mic",
      action: ({ textValue, setTextValue }) => {
        const lastEntry = [...textValue].pop()
        if (!lastEntry) return
        const lp = localPredictions()
        lp.store(lastEntry)
        /** @TODO ver https://vitejs.dev/guide/env-and-mode.html para arrumar typescript */
        fetch(`https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize?key=${import.meta.env.VITE_API_KEY}`, {
          method: "POST",
          body: JSON.stringify({
            audioConfig: {
              audioEncoding: "LINEAR16",
              effectsProfileId: [
                "small-bluetooth-speaker-class-device"
              ],
              pitch: 0,
              speakingRate: 1
            },
            input: {
              text: lastEntry
            },
            voice: {
              languageCode: "pt-BR",
              name: "pt-BR-Neural2-B"
            }
          })
        })
          .catch(err => console.error(err))
          .then(data => {
            if (!data) return Promise.reject("No data fetched")
            if (!data.ok) {
              return Promise.reject(new Error(JSON.stringify(data)))
            }
            return data.json()
          })
          .then(json => {
            const audio = new Audio(`data:audio/ogg;base64,${json.audioContent}`)
            audio.onended = () => setTextValue([""])
            audio.play()
          })
      }
    }
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