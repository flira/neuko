import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import keyExists from "@/utils/keyExists"
import KEYBOARD from "@/const/KEYBOARD"
import WS from "@/const/WS"
import { useEffect, useState } from "react"
import { lightGreen } from "@mui/material/colors"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { Keyboard } from "@/types"
import { SxProps, Theme } from "@mui/material"

export interface SuggestionProps {
    children: string
    position: Keyboard.KeyPosition
}

export default function Suggestion ({ children, position }: SuggestionProps) {
    const { currentKey, keySpeed, textValue, setCurrentKey, setTextValue } = useKeyboardContext()
    const [timerValue, setTimerValue] = useState(0)
    const focused = currentKey.toString() === position.toString()
    const defaultStyle: SxProps<Theme> = {
        borderRadius: "8px",
        position: "relative",
        py: 2,
        px: 4
    }

    let timerCounterIndex = 0
    let timerConterTimeout: NodeJS.Timeout

    const focusedStyle: SxProps<Theme> = {
        ...defaultStyle,
        backgroundColor: lightGreen.A200
    }

    const resetTimer = () => {
        clearInterval(timerConterTimeout)
        timerCounterIndex = 0
        setTimerValue(0)
    }

    const intervalHandler = () => {
        if (timerCounterIndex < 100) {
            setTimerValue(++timerCounterIndex)
            return
        }
        setTimerValue(100)
        resetTimer()
    }

    useEffect(() => {
        if (currentKey[0] === KEYBOARD.LIMIT) {
            WS.onmessage = ({ data }) => {
                const newKey: Keyboard.KeyPosition = [...currentKey]
                switch (data) {
                    default: break
                    case "w":
                        ++newKey[1]
                        break
                    case "s":
                        --newKey[1]
                        break
                }
                setCurrentKey(keyExists(newKey) ? newKey : [0, 0])
            }
        }
    })

    useEffect(() => {
        if (focused) {
            timerConterTimeout = setInterval(intervalHandler, (keySpeed) / 100)
        }
        return resetTimer
    }, [focused])

    useEffect(() => {
        if (focused && timerValue === 100) {
            const lastEntry = [...textValue].pop() as string
            const newValue =
                !textValue.length ? children :
                    /\s$/.test(lastEntry) ?
                        `${lastEntry}${children}` :
                        lastEntry.replace(/([\S]+)$/, ` ${children}`);
            setTextValue([...textValue, `${newValue} `])
            setCurrentKey([0, 0])
        }
    }, [timerValue])

    return (
        <Box
            data-x={position[0]}
            data-y={position[1]}
            sx={focused ? focusedStyle : defaultStyle}>
            {children}
            {focused ? <LinearProgress
                color="inherit"
                variant="determinate"
                value={timerValue} /> : ""}
        </Box>
    )
}