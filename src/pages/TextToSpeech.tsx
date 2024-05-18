import Layout from "@/components/Layout"
import fetchAutocomplete from "@/utils/fetchAutocomplete"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { TextKeyboard } from "@/components/keyboard"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Suggestion from "@/components/keyboard/Suggestion"
import HTML_IDS from "@/const/HTML_IDS"
import { useEffect } from "react"

/**
 * @TODO Tentar implementar TTS:
 * https://www.npmjs.com/package/@sefinek/google-tts-api
 */

export default function () {
  const { autocomplete, textValue: value, setAutocomplete } = useKeyboardContext()

  useEffect(() => {
    if (value.length) {
      fetchAutocomplete(value).then(suggestions => {
        const ac = !suggestions ? [] : suggestions.predictions.map(({ text }) => {
          const arr = Array.from(text)
          const words = value.split(" ")
          Array.from(words[words.length - 1]).forEach((letter, i) => {
            const code = letter.charCodeAt(0)
            if ((code < 97) || (code > 122 && code < 224)) {
              arr[i] = arr[i].toUpperCase()
            }
          })
          return arr.reduce((previous, current) => previous + current)
        })
        setAutocomplete(ac)
      })
    } else {
      setAutocomplete([])
    }
  }, [value])

  return (
    <Layout location={{ "Texto para fala": "text_to_speech" }}>
      <TextKeyboard>
        <Box sx={{ position: "relative" }}>
          <Box
            component="div"
            sx={{
              borderBottom: "solid 1px",
              minWidth: "62vw",
              pb: 4
            }}>
            <Typography component="div" variant="h1">
              {value}
              <Typography component="span" variant="h1" sx={{
                animation: "1.25s linear textcursor infinite",
                fontWeight: 400
              }}>|</Typography>
            </Typography>
          </Box>
          <Box component="div" sx={{
            position: "absolute",
            width: "100%"
          }}>
            {autocomplete.length ?
              <ol id={HTML_IDS.AUTOCOMPLETE_LIST}>
                {autocomplete.map((prediction, i, arr) => (
                  <li key={`autocomplete-prediction-${i}`}>
                    <Suggestion position={[0, (arr.length + 3) - i]}>
                      {prediction}
                    </Suggestion>
                  </li>
                ))}
              </ol> : ""}
          </Box>
        </Box>
      </TextKeyboard>
    </Layout>
  )
}

