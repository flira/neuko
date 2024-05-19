
/** Checa se um caracter é caixa alta. */
function isUppercase (char: string) {
    if (!char) return false
    const c = char.charCodeAt(0)
    return (c < 97) || (c > 122 && c < 224)
} 

export default isUppercase