import { Box } from "@mui/material"
import Key from "./Key"
import textKeys from "./keyset/text"
import keyExists from "../../utils/keyExists"
import React, { useEffect } from "react"
import { useKeyboardContext } from "../../providers/KeyboardProvider"
import type { Keyboard } from "src/types"

export function TextKeyboard({ children }: React.HTMLProps<HTMLElement>) {
  const {
    currentKey,
    setCurrentKey,
  } = useKeyboardContext()

  const keyMap = textKeys.map(rowMap)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1337', 'App')
    ws.onmessage = ({ data }) => {
      const newKey: Keyboard.KeyPosition = [...currentKey]
      switch (data) {
        default: break
        case "w":
          --newKey[1]
          keyExists(newKey) ?
            setCurrentKey(newKey) :
            setCurrentKey([currentKey[0], -1 * currentKey[1]])
          break
        case "a":
          --newKey[0]
          keyExists(newKey) ?
            setCurrentKey(newKey) :
            setCurrentKey([-1 * currentKey[0], currentKey[1]])
          break
        case "s":
          ++newKey[1]
          keyExists(newKey) ?
            setCurrentKey(newKey) :
            setCurrentKey([currentKey[0], -1 * currentKey[1]])
          break
        case "d":
          ++newKey[0]
          keyExists(newKey) ?
            setCurrentKey(newKey) :
            setCurrentKey([-1 * currentKey[0], currentKey[1]])
          break
      }
    }
    return () => {
      ws.close()
    }
  })

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <Box sx={{
        alignItems: "center",
        borderBottom: theme => `solid 1px ${theme.palette.grey[400]}`,
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        mb: 8
      }}>
        {children}
      </Box>
      {keyMap}
    </Box>
  )
}

function rowMap(row: Keyboard.Key[], y: number) {
  return (
    <Box
      key={btoa(`row-${y}`)}
      sx={{
        display: "flex",
        justifyContent: "center"
      }}>
      {row.map(keyMap.bind(null, y))}
    </Box>
  )
}

function keyMap(y: number, key: Keyboard.Key, x: number) {
  const numRows = textKeys.length
  const numCols = textKeys[0]?.length
  const position = [
    (x - (Math.floor(numCols / 2))),
    (y - (Math.floor(numRows / 2)))
  ] as Keyboard.KeyPosition
  return <Key
    key={btoa(`key-${(y * numCols) + x}`)}
    keyData={key}
    position={position} />
}

