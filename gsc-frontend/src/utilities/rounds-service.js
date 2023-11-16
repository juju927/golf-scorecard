import {
  startNewRoundAPI,
  getRoundAPI,
  getUserRoundsAPI,
  addStrokeAPI,
  toggleGIRAPI,
} from "./rounds-api";

export async function startNewRoundService(settings) {
  const data = await startNewRoundAPI(settings);
  return data.data.round;
}

export async function getRoundService(roundId) {
  const data = await getRoundAPI(roundId);
  return data.data.round;
}

export async function getUserRoundsService(userId) {
  const data = await getUserRoundsAPI(userId);
  return data.data.rounds;
}

export async function addStrokeService(strokeDetails) {
  const data = await addStrokeAPI(strokeDetails);
  return data.data;
}

export async function toggleGIRService(holeDetails) {
  const data = await toggleGIRAPI(holeDetails);
  return data.data;
}
