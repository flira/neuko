import Layout from "./Layout"
import fetchAutocomplete from "../utils/fetchAutocomplete"
import { useKeyboardContext } from "../providers/KeyboardProvider"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import { useEffect } from "react"

/**
 * @TODO Tentar implementar o (@link https://www.npmjs.com/package/duckduckit#8-suggestions---suggestions-by-duckduckgocom | duckduckit)
 * para fazer o autofill (ver item 8: suggestion)
 */

export default function () {
  const { textValue: value } = useKeyboardContext()

  useEffect(() => {
    if (value.length) {
      fetchAutocomplete(value).then(suggestions => console.log(suggestions))
    }
  }, [value])

  return (
    <Layout>
      <Box sx={{
        borderBottom: "solid 1px"
      }}>
        <Typography component="div" variant="h1">
          {value}
          <Typography component="span" variant="h1" sx={{ fontWeight: 400 }}>|</Typography>
        </Typography>
      </Box>
    </Layout>
  )
}

