import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import React, { useEffect, useState } from "react"
import { lightGreen } from "@mui/material/colors"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { Keyboard } from "@/types"
import { SxProps, Theme } from "@mui/material"

export interface SuggestionProps {
    children: string
    position: Keyboard.KeyPosition
}

export default function ({ children, position }: SuggestionProps) {
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
        if (!focused) {
            resetTimer()
        } else {
            timerCounterIndex = 0
            timerConterTimeout = setInterval(intervalHandler, (keySpeed) / 100)
        }
    }, [focused])

    useEffect(() => {
        if (focused && timerValue === 100) {
            const newValue =
                !textValue.length ? children :
                    /\s$/.test(textValue) ?
                        `${textValue}${children}` :
                        textValue.replace(/([\S]+)$/, ` ${children}`);
            setTextValue(`${newValue} `)
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