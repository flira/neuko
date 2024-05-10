import Box from "@mui/material/Box"
import Key from "@/components/keyboard/Key"
import type { Keyboard } from "src/types"

function keyboardMap(row: Keyboard.Key[], y: number, keyset: Keyboard.Key[][]) {
  return (
    <Box
      key={btoa(`row-${y}`)}
      sx={{
        display: "flex",
        justifyContent: "center"
      }}>
      {row.map(keyMap.bind(null, y, keyset))}
    </Box>
  )
}

function keyMap(y: number, keyset: Keyboard.Key[][], key: Keyboard.Key, x: number) {
  const numRows = keyset.length
  const numCols = keyset[0]?.length
  const position = [
    (x - (Math.floor(numCols / 2))),
    (y - (Math.floor(numRows / 2)))
  ] as Keyboard.KeyPosition
  return <Key
    key={btoa(`key-${(y * numCols) + x}`)}
    keyData={key}
    position={position} />
}

export default keyboardMap