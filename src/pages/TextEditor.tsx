import Layout from "./Layout"
import { useKeyboardContext } from "../providers/KeyboardProvider"
import Typography from "@mui/material/Typography"

/**
 * @TODO Tentar implementar o (@link https://www.npmjs.com/package/duckduckit#8-suggestions---suggestions-by-duckduckgocom | duckduckit)
 * para fazer o autofill (ver item 8: suggestion)
 */

export default function () {
  const { textValue: value } = useKeyboardContext()

  return (
    <Layout>
      <Typography component="div" variant="h1">
      {value}
      <Typography component="span" variant="h1" sx={{fontWeight: 400}}>|</Typography>
      </Typography>
    </Layout>
  )
}

