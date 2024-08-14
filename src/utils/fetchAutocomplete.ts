import PREDICTIONS from "@/const/PREDICTIONS"
import type { Typewise } from "../types"

/**
 * @param value 
 * @param maxPredictions 
 * @returns 
 */
export default async function fetchAutocomplete(
  value: string,
  maxPredictions = PREDICTIONS.MAX_PREDICTIONS) {
  let request
  try {
    request = await fetch("https://api.typewise.ai/latest/completion/complete", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "languages": ["pt"],
        "text": value,
        "correctTypoInPartialWord": true,
        "maxNumberOfPredictions": maxPredictions
      })
    })
    if (!request.ok) {
      console.error(request)
      return
    }
    return request.json() as Promise<Typewise.CompletionResponse>
  } catch (err) {
    console.error(err)
    return
  }
}