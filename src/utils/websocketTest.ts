/**
 * Script para teste do websocket.
 * Usa o "WASD" ou setas do teclado para enviar
 * comandos para o servidor sem precisar de usar
 * a aplicação EEG.
 */

export default function websocketTest() {
  const ws = new WebSocket("ws://localhost:1337")
  const keyDown = ({ key }: KeyboardEvent) => {
    const regex = /[wasd]|^arrow/i
    if (regex.test(key)) {
      switch (key) {
        case "w":
        case "ArrowUp":
          ws.send("w")
          break
        case "a":
        case "ArrowLeft":
          ws.send("a")
          break
        case "s":
        case "ArrowDown":
          ws.send("s")
          break
        case "d":
        case "ArrowRight":
          ws.send("d")
          break
        default: break
      }
    }
  }
  addEventListener("keydown", keyDown)
}