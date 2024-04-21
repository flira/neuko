import Layout from "./Layout"
import { useKeyboardContext } from "../providers/KeyboardProvider"

/**
 * @TODO Tentar implementar o (@link https://www.npmjs.com/package/duckduckit#8-suggestions---suggestions-by-duckduckgocom | duckduckit)
 * para fazer o autofill (ver item 8: suggestion)
 */

export default function () {
  const { textValue: value } = useKeyboardContext()

  return (
    <Layout>
      {value}|
    </Layout>
  )
}

