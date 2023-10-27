import { startNewRoundAPI } from "./rounds-api";

export async function startNewRoundService(settings) {
  const data = await startNewRoundAPI(settings)
  return data.data.newRound
}