import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import React from "react"
import { lightGreen } from "@mui/material/colors"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import { Keyboard } from "@/types"
import { SxProps, Theme } from "@mui/material"

export interface SuggestionProps {
    children: React.ReactNode
    position: Keyboard.KeyPosition
}

export default function ({ children, position }: SuggestionProps) {
    const { currentKey, setCurrentKey } = useKeyboardContext()
    const focused = currentKey.toString() === position.toString()
    const defaultStyle: SxProps<Theme> = {
        borderRadius: "8px",
        py: 2,
        px: 4
    }

    const focusedStyle: SxProps<Theme> = {
        ...defaultStyle,
        backgroundColor: lightGreen.A200
    }

    return (
        <Box
            data-x={position[0]}
            data-y={position[1]} sx={focused ? focusedStyle : defaultStyle}>
            {children}
            <LinearProgress
                color="inherit"
                variant="determinate"
                value={0}
                sx={{
                    opacity: focused ? 1 : 0
                }}
            />
        </Box>
    )
}