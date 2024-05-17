import type { Keyboard } from "@/types"

const appKeys: Keyboard.Key[][] = []

appKeys.push([ // linha 1
    {
        type: "cmd",
        setter: "location",
        value: "settings",
        label: "settings",
        action: (navigate) => navigate("/settings")
    },
    { type: "neutral" },
    {
        type: "cmd",
        setter: "location",
        value: "text editor",
        label: "text_to_speech",
        // por algum motivo "redirect" do react-router-dom não funcionou
        action: (navigate) => navigate("/texteditor")
    }
])

export default appKeys