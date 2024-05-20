import { Box, CircularProgress } from "@mui/material"
import { lightGreen } from "@mui/material/colors"
import { Icon } from "@/components/Icon"
import { useEffect, useState } from "react"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { useNavigate } from "react-router-dom"
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
          bgcolor: lightGreen.A200
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
            value={key.value}
            skipKeyReset={key.skipKeyReset}>
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
    const newEntry = [...textValue].pop() + getValue()
    setTextValue([...textValue, newEntry])
    if (caps.active && !caps.locked) {
      setCaps({ active: false, locked: false })
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
  action: (params: Keyboard.ActionParams) => void
  children: string
  selected: boolean
  value?: Keyboard.KeyLabel
  skipKeyReset?: boolean
}


function CmdKey(
  { action, children, value, selected, skipKeyReset }: CmdKeyProps
) {
  const kc = useKeyboardContext()
  const navigate = useNavigate()

  const timeoutHandler = () => {
    action({ navigate: navigate, ...kc })
    if (!skipKeyReset) {
      kc.setCurrentKey([0, 0])
    }
  }

  useEffect(() => {
    if (selected) {
      clearTimeout(keyboardTimer)
      keyboardTimer = setTimeout(timeoutHandler, kc.keySpeed)
    }
    return () => {
      clearTimeout(keyboardTimer)
    }
  }, [selected])

  const KeyBase = () => {
    if (!value || (!kc.caps.active && !kc.caps.locked)) {
      return (
        <Icon>
          {children}
        </Icon>
      )
    }
    if (kc.caps.locked) {
      return (
        <Icon fill={value?.caps?.fill}>
          {value?.caps?.label ? value.caps.label : children}
        </Icon>
      )
    }
    return (
      <Icon fill={value?.shift?.fill}>
        {value?.shift?.label ? value.shift.label : children}
      </Icon>
    )
  }

  return (
    !selected ?
      <KeyBase /> :
      <TimerCounter>
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
      return
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
    }, (keySpeed - animationTime) / 100)
  }, [])

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