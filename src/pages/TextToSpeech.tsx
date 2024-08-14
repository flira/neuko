import Layout from "@/components/Layout"
import fetchAutocomplete from "@/utils/fetchAutocomplete"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { TextKeyboard } from "@/components/keyboard"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Suggestion from "@/components/keyboard/Suggestion"
import isUppercase from "@/utils/isUpperCase"
import localPredictions from "@/utils/localPredictions"
import KEYBOARD from "@/const/KEYBOARD"
import PREDICTIONS from "@/const/PREDICTIONS"
import { useEffect } from "react"

/**
 * @TODO Tentar implementar TTS:
 * https://www.npmjs.com/package/@sefinek/google-tts-api
 */

export default function TTS () {
  const { autocomplete, textValue, setAutocomplete } = useKeyboardContext()

  useEffect(() => {
    const lastEntry = [...textValue].pop()
    if (lastEntry) {
      const lp = localPredictions()
      const ac = lp.from(lastEntry)
      fetchAutocomplete(lastEntry, PREDICTIONS.MAX_PREDICTIONS - ac.length)
        .then(predictions => {
          if (!predictions) {
            return
          }
          predictions.predictions.forEach(({ text }) => {
            const lastWord = lastEntry.split(" ").pop()
            if (!lastWord || !isUppercase(lastWord)) {
              ac.push(text)
            } else if (isUppercase(lastWord[1])) {
              ac.push(text.toLocaleUpperCase())
            } else {
              ac.push(text[0].toUpperCase() + text.substring(1))
            }
          })
          setAutocomplete(ac)
        })
    } else {
      setAutocomplete([])
    }
  }, [textValue])

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
              {[...textValue].pop()}
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
              <ol id={PREDICTIONS.HTML_ID}>
                {autocomplete.map((prediction, i, arr) => (
                  <li key={`autocomplete-prediction-${i}`}>
                    <Suggestion position={[KEYBOARD.LIMIT, arr.length - (i + 1)]}>
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

