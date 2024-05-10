import appKeys from "@/components/keyboard/keyset/apps"
import Box from "@mui/material/Box"
import keyboardControl from "@/utils/keyboardControl"
import keyboardMap from "@/utils/keyboardMap"
import Layout from "@/components/Layout"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { useEffect } from "react"


export default function () {
  const {currentKey, setCurrentKey} = useKeyboardContext()
  useEffect(keyboardControl.bind(null, currentKey, setCurrentKey))

  return (
    <Layout>
      <Box sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        mb: 8
      }}>
        {appKeys.map(keyboardMap)}
      </Box>
    </Layout>
  )
}

