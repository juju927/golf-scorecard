import { startNewRoundAPI, getRoundAPI, getUserRoundsAPI } from "./rounds-api";

export async function startNewRoundService(settings) {
  const data = await startNewRoundAPI(settings)
  return data.data.round
}

export async function getRoundService(roundId) {
  const data = await getRoundAPI(roundId)
  return data.data.round
}

export async function getUserRoundsService(userId) {
  const data = await getUserRoundsAPI(userId)
  return data.data.rounds
}