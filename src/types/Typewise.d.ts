export namespace Typewise {
    export interface Prediction {
        completionStartingIndex: number
        model_unique_identifier: string
        score: number
        scoreBeforeRescoring: number
        source: string
        text: string
    }

    export interface CompletionResponse {
        language: string
        predictions: Prediction[]
        text: string
    }
}