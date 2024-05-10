import Layout from "@/components/Layout"
import fetchAutocomplete from "@/utils/fetchAutocomplete"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { TextKeyboard } from "@/components/keyboard"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import { useEffect } from "react"
import { Typewise } from "@/types";

/**
 * @TODO Tentar implementar TTS:
 * https://www.npmjs.com/package/@sefinek/google-tts-api
 */

export default function () {
  const { autocomplete, textValue: value, setAutocomplete } = useKeyboardContext()

  useEffect(() => {
    if (value.length) {
      fetchAutocomplete(value).then(suggestions => {
        const ac = !suggestions ? [] : suggestions.predictions.map(({ text }) => text)
        setAutocomplete(ac)
      })
    } else {
      setAutocomplete([])
    }
  }, [value])

  return (
    <Layout location={{ "Texto para fala": "text_to_speech" }}>
      <TextKeyboard>
        <div>
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
          <Box component="div" sx={{ position: "absolute" }}>
            <ol>
              {autocomplete.map((prediction, i) => (
                <li key={`autocomplete-prediction-${i}`}>
                  <div>
                    {prediction}
                  </div>
                </li>
              ))}
            </ol>
          </Box>
        </div>
      </TextKeyboard>
    </Layout>
  )
}

