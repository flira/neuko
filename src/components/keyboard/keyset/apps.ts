import type { Keyboard } from "@/types"

const appKeys: Keyboard.Key[][] = []

appKeys.push([ // linha 1
    {
        type: "cmd",
        value: "settings",
        label: "settings",
        action: () => location.assign("/settings")
    },
    { type: "neutral" },
    {
        type: "cmd",
        value: "text editor",
        label: "text_to_speech",
        // por algum motivo "redirect" do react-router-dom não funcionou
        action: () => location.assign("/texteditor")
    }
])

export default appKeys