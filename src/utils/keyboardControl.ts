import keyExists from "./keyExists"
import KEYBOARD from "@/const/KEYBOARD"
import WS from "@/const/WS"
import type { Keyboard } from "@/types"

/**
 * Adiciona controle por webservice nos teclados virtuais.
 * Usar com efeito react em componentes com teclado.
 * @param currentKey @see {@link useKeyboardContext}
 * @param setCurrentKey @see {@link useKeyboardContext}
 * @example
 * ``` jsx
 * const {currentKey, setCurrentKey} = useKeyboardContext()
 * useEffect(keyboardControl.bind(null, currentKey, setCurrentKey))
 * ```
 */
export default function keyboardControl(
    currentKey: Keyboard.KeyPosition,
    setCurrentKey: React.Dispatch<React.SetStateAction<Keyboard.KeyPosition>>) {
    WS.onmessage = ({ data }) => {
        const newKey: Keyboard.KeyPosition = [...currentKey]
        switch (data) {
            default: break
            case "w":
                ++newKey[1]
                if (!keyExists(newKey)) {
                    newKey[1] = -KEYBOARD.LIMIT
                    while (!keyExists(newKey)) {
                        ++newKey[1]
                    }
                }
                setCurrentKey(newKey)
                break
            case "a":
                --newKey[0]
                if (!keyExists(newKey)) {
                    newKey[0] = KEYBOARD.LIMIT
                    while (!keyExists(newKey)) {
                        --newKey[0]
                    }
                }
                setCurrentKey(newKey)
                break
            case "s":
                --newKey[1]
                if (!keyExists(newKey)) {
                    newKey[1] = KEYBOARD.LIMIT
                    while (!keyExists(newKey)) {
                        --newKey[1]
                    }
                }
                setCurrentKey(newKey)
                break
            case "d":
                ++newKey[0]
                if (!keyExists(newKey)) {
                    newKey[0] = -KEYBOARD.LIMIT
                    while (!keyExists(newKey)) {
                        ++newKey[0]
                    }
                }
                setCurrentKey(newKey)
        }
    }
    return () => {
        WS.onmessage = null
    }
}