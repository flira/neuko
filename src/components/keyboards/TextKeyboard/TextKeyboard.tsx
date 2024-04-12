import { Box } from "@mui/material";
import { Icon } from "../../Icon";
import { rows } from "./rows";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Keyboard } from "src/types";

const KeyboardContext = createContext<Keyboard.KeyboardContext | null>(null);

export function TextKeyboard() {
  const [currentKey, setCurrentKey] = useState([0, 0] as Keyboard.KeyPosition)
  const [value, setValue] = useState("")
  

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1337', 'App')
    ws.onmessage = ({data}) => {
      console.log(data)
    }
    return () => {
      ws.close()
    }
  })

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <KeyboardContext.Provider value={{ currentKey, value, setValue }}>
        {rows.map(rowMap)}
      </KeyboardContext.Provider>
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
  const numRows = rows.length;
  const numCols = rows[0]?.length;
  return <Key
    key={btoa(`key-${(y * numCols) + x}`)}
    keyData={key}
    position={[
      (x - (Math.floor(numCols / 2))),
      (y - (Math.floor(numRows / 2)))
    ]} />
}

interface KeyProps {
  keyData: Keyboard.Key,
  position: Keyboard.KeyPosition;
}

function Key({ keyData: key, position }: KeyProps) {
  const { currentKey } = useContext(KeyboardContext)
  const isSelected = JSON.stringify(position) === JSON.stringify(currentKey);
  const Container = ({
    children,
    ...otherProps
  }: React.HTMLProps<HTMLDivElement>) => (
    <Box
      {...otherProps}
      sx={{
        alignItems: "center",
        borderRadius: "100%",
        display: "flex",
        fontSize: "2em",
        height: "2em",
        justifyContent: "center",
        lineHeight: "1",
        textAlign: "center",
        width: "2em",
        ...(isSelected ? {
          bgcolor: "#c0ffee"
        } : {})
      }}>
      {children}
    </Box>
  )
  switch (key.type) {
    default: {
      return <Container />
    }
    case "char": {
      return (
        <Container
          data-position={`${position}`}
          data-selected={`${isSelected}`}>
          {key.value}
        </Container >
      )
    }
    case "cmd": {
      return (
        <Container
          data-position={`${position}`}
          data-selected={`${isSelected}`}>
          <Icon>
            {key.label}
          </Icon>
        </Container>
      )
    }
  }
}