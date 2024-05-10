import Box from "@mui/material/Box"
import textKeys from "./keyset/text"
import keyboardControl from "@/utils/keyboardControl"
import keyboardMap from "@/utils/keyboardMap"
import React, { useEffect } from "react"
import { useKeyboardContext } from "@/providers/KeyboardProvider"

export function TextKeyboard({ children }: {children: React.ReactNode}) {
  const {currentKey, setCurrentKey} = useKeyboardContext()
  useEffect(keyboardControl.bind(null, currentKey, setCurrentKey))

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <Box sx={{
        alignItems: "center",
        background: theme => theme.palette.grey[200],
        borderRadius: "10px",
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        mb: 8
      }}>
        {children}
      </Box>
      {textKeys.map(keyboardMap)}
    </Box>
  )
}
