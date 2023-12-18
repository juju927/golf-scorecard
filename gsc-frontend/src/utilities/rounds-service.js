import {
  startNewRoundAPI,
  getRoundAPI,
  getUserRoundsAPI,
  deleteRoundAPI,
  addStrokeAPI,
  deleteStrokeAPI,
  updateStatsAPI,
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

export async function addStrokeService(holeRecord) {
  const data = await addStrokeAPI(holeRecord);
  return data.data;
}

export async function editStrokeService(holeRecord) {
  const data = await editStrokeAPI(holeRecord);
  return data.data;
}

export async function deleteStrokeService(holeRecord) {
  const data = await deleteStrokeAPI(holeRecord);
  return data.data;
}

export async function updateStatsService(holeDetails) {
  const data = await updateStatsAPI(holeDetails);
  return data.data;
}
