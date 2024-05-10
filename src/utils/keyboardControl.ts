import keyExists from "./keyExists";
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import type { Keyboard } from "@/types";

/**
 * Adiciona controle por webservice nos teclados virtuais.
 * Usar com efeito react em componentes com teclado.
 * @param currentKey @see {@link useKeyboardContext}
 * @param setCurrentKey @see {@link useKeyboardContext}
 * @example
 * ``` jsx
 * const {currentKey, setCurrentKey} = useKeyboardContext();
 * useEffect(keyboardControl.bind(null, currentKey, setCurrentKey))
 * ```
 */
function keyboardControl(
    currentKey: Keyboard.KeyPosition,
    setCurrentKey: React.Dispatch<React.SetStateAction<Keyboard.KeyPosition>>) {
    const ws = new WebSocket('ws://localhost:1337', 'App')
    ws.onmessage = ({ data }) => {
        const newKey: Keyboard.KeyPosition = [...currentKey]
        switch (data) {
            default: break
            case "w":
                --newKey[1]
                keyExists(newKey) ?
                    setCurrentKey(newKey) :
                    setCurrentKey([currentKey[0], -1 * currentKey[1]])
                break
            case "a":
                --newKey[0]
                keyExists(newKey) ?
                    setCurrentKey(newKey) :
                    setCurrentKey([-1 * currentKey[0], currentKey[1]])
                break
            case "s":
                ++newKey[1]
                keyExists(newKey) ?
                    setCurrentKey(newKey) :
                    setCurrentKey([currentKey[0], -1 * currentKey[1]])
                break
            case "d":
                ++newKey[0]
                keyExists(newKey) ?
                    setCurrentKey(newKey) :
                    setCurrentKey([-1 * currentKey[0], currentKey[1]])
                break
        }
    }
    return () => {
        ws.close()
    }
}

export default keyboardControl