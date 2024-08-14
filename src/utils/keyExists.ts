import type { Keyboard } from "@/types"

export default function keyExists(position: Keyboard.KeyPosition)  {
  return !!document.querySelector(
    `[data-x="${position[0]}"][data-y="${position[1]}"]`
  )
}