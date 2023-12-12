import {
  startNewRoundAPI,
  getRoundAPI,
  getUserRoundsAPI,
  deleteRoundAPI,
  addStrokeAPI,
  deleteStrokeAPI,
  toggleGIRAPI,
  editStrokeAPI,
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

export async function deleteRoundService(roundId) {
  const data = await deleteRoundAPI(roundId);
  return data;
}

export async function addStrokeService(strokeDetails) {
  const data = await addStrokeAPI(strokeDetails);
  return data.data;
}

export async function editStrokeService(strokeDetails) {
  const data = await editStrokeAPI(strokeDetails);
  return data.data;
}

export async function deleteStrokeService(strokeDetails) {
  const data = await deleteStrokeAPI(strokeDetails);
  return data.data;
}

export async function toggleGIRService(holeDetails) {
  const data = await toggleGIRAPI(holeDetails);
  return data.data;
}
