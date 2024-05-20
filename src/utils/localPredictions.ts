import PREDICTIONS from "@/const/PREDICTIONS"
import type { Keyboard } from "@/types"

/**
 * Classe para facilitar armazenagem e 
 * recuperação de sugestões usando localStorage
 * do navegador.
 */
class LocalPredictions {
  /**
   * ID do localStora usada pela classe.
   * @private @readonly
   */
  private readonly _STORAGE_ID = btoa("autocomplete")
  /**
   * Array com as sugestões.
   * @private
   */
  private _predictions: Keyboard.localPrediction[]

  constructor() {
    const localStorageSuggestions = localStorage.getItem(this._STORAGE_ID)
    this._predictions = localStorageSuggestions ?
      JSON.parse(atob(localStorageSuggestions)) : []
  }

  /**
   * Armazena sugestão no localStorage, guardando
   * também o número de vezes que ela já foi usada.
   * @param entry Sugestão a ser armazenada.
   */
  public store(entry: string) {
    const e = entry.replaceAll(/^\s+|\s+$/g, "").replaceAll(/\s+/g, " ")
    const index = this._predictions.findIndex(
      prediction => (
        new RegExp(`${e}`, "gi").test(prediction.value)
      )
    )
    if (index !== -1) {
      this._predictions.splice(index, 1, {
        value: this._predictions[index].value,
        timesUsed: ++this._predictions[index].timesUsed
      })
    } else {
      this._predictions.push({
        value: e,
        timesUsed: 1
      })
    }
    localStorage.setItem(
      this._STORAGE_ID,
      btoa(JSON.stringify(this._predictions))
    )
  }

  /**
   * Gera lista de sugestões para autocomplete com
   * itens que já foram escritos antes, ordenado do
   * mais usado para o menos usado.
   * @param entry Texto a ser completado.
   * @param maxPredictions 
   * Número de itens a serem retornados.
   * @returns Lista de sugestões para autocomplete
   */
  public from(
    entry: string,
    maxPredictions = PREDICTIONS.MAX_PREDICTIONS) {
    return this._predictions
      .filter(({ value }) => (
        new RegExp(`${entry}`, "gi").test(value)
      ))
      .toSorted((a, b) => b.timesUsed - a.timesUsed)
      .splice(0, maxPredictions)
      .map(({ value }) => value)
  }
}

export default () => new LocalPredictions()