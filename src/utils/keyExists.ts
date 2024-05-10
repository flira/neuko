import type { Keyboard } from "@/types"

function keyExists(position: Keyboard.KeyPosition)  {
  return !!document.querySelector(
    `[data-x="${position[0]}"][data-y="${position[1]}"]`
  )
}

export default keyExists