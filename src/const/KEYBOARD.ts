import type { Keyboard } from "@/types"

interface KeyboardConst {
    LIMIT: number
    DEFAULT_CAPS: Keyboard.Caps
    DEFAULT_LAYOUT: Keyboard.Layout
    DEFAULT_SPEED: number
    /** Velocidade do teclado */
    SPEED_ID: string
}

const KEYBOARD: KeyboardConst = {
    LIMIT: 20,
    DEFAULT_CAPS: { active: false, locked: false },
    DEFAULT_LAYOUT: "navigation",
    DEFAULT_SPEED: 1250,
    SPEED_ID: btoa("keyboard speed")
}

export default Object.freeze(KEYBOARD)