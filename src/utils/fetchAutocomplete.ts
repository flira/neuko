import { Typewise } from "../types"

export default async function (value: string) {
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
        "maxNumberOfPredictions": 6
      })
    })
    if (!request.ok) {
      console.error(request);
      return;
    }
    return request.json() as Promise<Typewise.CompletionResponse>;
  } catch(err) {
    console.error(err);
    return;
  }
}