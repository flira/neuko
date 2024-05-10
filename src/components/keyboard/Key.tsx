import { Box, CircularProgress } from "@mui/material"
import { cyan } from "@mui/material/colors"
import { Icon } from "@/components/Icon"
import { useEffect, useState } from "react"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import type { Keyboard } from "@/types"
import type { BoxProps } from "@mui/material"

export interface KeyProps {
  keyData: Keyboard.Key,
  position: Keyboard.KeyPosition
}

export default function Key({ keyData: key, position }: KeyProps) {
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
      return (
        <Container data-x={position[0]} data-y={position[1]}>
          <CharKey selected={isSelected}>
            {key.value}
          </CharKey>
        </Container >
      )
    }
    case "cmd": {
      return (
        <Container data-x={position[0]} data-y={position[1]}>
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
      return (
        <Container data-x={position[0]} data-y={position[1]}>
          <Icon>pending</Icon>
        </Container>
      )
    }
  }
}

let keyboardTimer: NodeJS.Timeout

interface CharKeyProps {
  children: string,
  selected: boolean
}

function CharKey({ children, selected }: CharKeyProps) {
  const {
    caps,
    keySpeed,
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
      keyboardTimer = setTimeout(timeoutHandler, keySpeed)
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
    keySpeed,
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
      keyboardTimer = setTimeout(timeoutHandler, keySpeed)
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
  const { keySpeed } = useKeyboardContext()
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
        setTimerValue(++timerCounterIndex);
        return;
      }
      setTimerValue(100);
      timerCounterIndex = 0;
      clearInterval(timerConterTimeout);
      timerConterTimeout = null;
    }, (keySpeed - animationTime) / 100)
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