/** Adapta o tamanho da fonte ao tamanho da tela */
export default function responsiveFont() {
  const html = document.documentElement
  const fontSize = () => {
    const size = Math.min(innerWidth, innerHeight) / 6.5
    html.style.fontSize = `${size}%`
  }
  addEventListener("resize", fontSize)
  fontSize()
}