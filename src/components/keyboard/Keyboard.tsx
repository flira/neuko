import { Box, CircularProgress } from "@mui/material"
import { cyan } from "@mui/material/colors"
import { Icon } from "../Icon"
import { textKeys } from "./keyset/text"
import React, { useEffect, useState } from "react"
import { useKeyboardContext } from "../../providers/KeyboardProvider"
import type { Keyboard } from "src/types"
import type { BoxProps } from "@mui/material"

const validPositions: Set<string> = new Set()

export function TextKeyboard({ children }: React.HTMLProps<HTMLElement>) {
  const { currentKey, setCurrentKey } = useKeyboardContext()
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1337', 'App')
    ws.onmessage = ({ data }) => {
      const newKey: Keyboard.KeyPosition = [...currentKey]
      switch (data) {
        default: break
        case "w":
          --newKey[1]
          validPositions.has(newKey.toString()) ?
            setCurrentKey(newKey) :
            setCurrentKey([currentKey[0], -1 * currentKey[1]])
          break
        case "a":
          --newKey[0]
          validPositions.has(newKey.toString()) ?
            setCurrentKey(newKey) :
            setCurrentKey([-1 * currentKey[0], currentKey[1]])
          break
        case "s":
          ++newKey[1]
          validPositions.has(newKey.toString()) ?
            setCurrentKey(newKey) :
            setCurrentKey([currentKey[0], -1 * currentKey[1]])
          break
        case "d":
          ++newKey[0]
          validPositions.has(newKey.toString()) ?
            setCurrentKey(newKey) :
            setCurrentKey([-1 * currentKey[0], currentKey[1]])
          break
      }
      if (validPositions.has(newKey.toString())) {
        setCurrentKey(newKey)
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
        background: theme => theme.palette.grey[200],
        borderRadius: "10px",
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        mb: 8
      }}>
        {children}
      </Box>
      {textKeys.map(rowMap)}
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

interface KeyProps {
  keyData: Keyboard.Key,
  position: Keyboard.KeyPosition
}

function Key({ keyData: key, position }: KeyProps) {
  const { currentKey } = useKeyboardContext()
  const stringPosition = position.toString()
  const isSelected = stringPosition === currentKey.toString()

  const Container = ({
    children,
    ...otherProps
  }: BoxProps) => (
    <Box
      {...otherProps}
      sx={{
        alignItems: "center",
        borderRadius: "100%",
        display: "flex",
        fontSize: "2em",
        height: "1.6em",
        justifyContent: "center",
        lineHeight: "1",
        textAlign: "center",
        width: "1.6em",
        ...(isSelected ? {
          bgcolor: cyan.A100
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
      validPositions.add(stringPosition)
      return (
        <Container>
          <CharKey selected={isSelected}>
            {key.value}
          </CharKey>
        </Container >
      )
    }
    case "cmd": {
      validPositions.add(stringPosition)
      return (
        <Container>
          <CmdKey
            action={key.action}
            selected={isSelected}
            value={key.value}>
            {key.label}
          </CmdKey>
        </Container>
      )
    }
    case "neutral": {
      validPositions.add(stringPosition)
      return (
        <Container>
          <Icon>pending</Icon>
        </Container>
      )
    }
  }
}

let keyboardTimer: NodeJS.Timeout
const keyPressLag = 1.25e3

interface CharKeyProps {
  children: string,
  selected: boolean
}

function CharKey({ children, selected }: CharKeyProps) {
  const {
    caps,
    setCaps,
    setTextValue,
    setCurrentKey,
    textValue } = useKeyboardContext()

  const getValue = () => caps.active ? children.toUpperCase() : children

  const timeoutHandler = () => {
    setTextValue(textValue + getValue())
    if (caps.active && !caps.locked) {
      setCaps({ active: false, locked: false });
    }
    setCurrentKey([0, 0])
  }

  useEffect(() => {
    if (selected) {
      clearTimeout(keyboardTimer)
      keyboardTimer = setTimeout(timeoutHandler, keyPressLag)
    }
    return () => {
      clearTimeout(keyboardTimer)
    }
  }, [selected])

  const KeyBase = () => <>{getValue()}</>

  return (
    !selected ?
      <KeyBase /> :
      <TimerCounter>
        <KeyBase />
      </TimerCounter>
  )
}

interface CmdKeyProps {
  children: string
  selected: boolean
  value: string
  action: (cmdKeyAction: Keyboard.CmdKeyAction<string | Keyboard.Caps>) => void
}

function CmdKey({ action, children, selected, value }: CmdKeyProps) {
  const {
    caps,
    setCaps,
    setCurrentKey,
    setTextValue,
    textValue } = useKeyboardContext()

  function actionReducer(): Keyboard.CmdKeyAction<string | Keyboard.Caps> {
    switch (value) {
      default:
        return {
          value: textValue,
          setter: setTextValue
        }
      case "shift":
        return {
          value: caps,
          setter: setCaps
        }
    }
  }

  const timeoutHandler = () => {
    action(actionReducer())
    setCurrentKey([0, 0])
  }

  useEffect(() => {
    if (selected) {
      clearTimeout(keyboardTimer)
      keyboardTimer = setTimeout(timeoutHandler, keyPressLag)
    }
    return () => {
      clearTimeout(keyboardTimer)
    }
  }, [selected])

  const KeyBase = () => value !== "shift" || !caps.active ?
    <Icon>
      {children}
    </Icon> :
    !caps.locked ?
      <Icon fill={true}>
        {children}
      </Icon> :
      <Icon fill={true}>
        {"shift_lock"}
      </Icon>

  return (
    !selected ?
      <KeyBase /> :
      <TimerCounter title={value}>
        <KeyBase />
      </TimerCounter>
  )
}

function TimerCounter({ children, ...otherProps }: BoxProps) {
  const [timerValue, setTimerValue] = useState(0)

  let timerCounterIndex: number
  let timerConterTimeout: NodeJS.Timeout
  const animationTime = 300

  useEffect(() => {
    if (timerConterTimeout) {
      return;
    }
    timerCounterIndex = 0
    timerConterTimeout = setInterval(() => {
      if (timerCounterIndex < 100) {
        setTimerValue(++timerCounterIndex)
        return
      }
      setTimerValue(100)
      timerCounterIndex = 0
      clearInterval(timerConterTimeout)
    }, (keyPressLag - animationTime) / 100)
  }, []);

  return (
    <Box
      {...otherProps}
      sx={{
        animation: (timerValue !== 100) ?
          undefined : `${animationTime}ms ease-in-out keypress`,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}>
      <Box sx={{
        color: theme => theme.palette.grey[900],
        position: "absolute",
      }}>
        <CircularProgress
          color="inherit"
          size={"1.6em"}
          value={timerValue}
          variant="determinate" />
      </Box>
      {children}
    </Box>
  )
}