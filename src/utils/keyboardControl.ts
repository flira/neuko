import keyExists from "./keyExists";
import WS from "@/const/webservice";
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
    WS.onmessage = ({ data }) => {
        const newKey: Keyboard.KeyPosition = [...currentKey]
        const l = 20
        switch (data) {
            default: break
            case "w":
                ++newKey[1]
                if (!keyExists(newKey)) {
                    newKey[1] = -l
                    while (!keyExists(newKey)) {
                        ++newKey[1]
                    }
                }
                setCurrentKey(newKey)
                break
            case "a":
                --newKey[0]
                if (!keyExists(newKey)) {
                    newKey[0] = l
                    while (!keyExists(newKey)) {
                        --newKey[0]
                    }
                }
                setCurrentKey(newKey)
                break
            case "s":
                --newKey[1]
                if (!keyExists(newKey)) {
                    newKey[1] = l
                    while (!keyExists(newKey)) {
                        --newKey[1]
                    }
                }
                setCurrentKey(newKey)
                break
            case "d":
                ++newKey[0]
                if (!keyExists(newKey)) {
                    newKey[0] = -l
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

export default keyboardControl