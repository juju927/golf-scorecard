import sendRequest from "./send-request";

const baseURL = import.meta.env.VITE_BASE_URL + "rounds";

export function startNewRoundAPI(settings) {
  return sendRequest(baseURL, "POST", settings);
}

export function getRoundAPI(roundId) {
  return sendRequest(baseURL + "/round" + `?id=${roundId}`);
}

export function getUserRoundsAPI() {
  return sendRequest(baseURL);
}

export function deleteRoundAPI(roundId) {
  return sendRequest(baseURL, "DELETE", roundId);
}

export function addStrokeAPI(holeRecord) {
  return sendRequest(baseURL + "/record/stroke", "POST", holeRecord);
}

export function editStrokeAPI(holeRecord) {
  return sendRequest(baseURL + "/record/stroke", "PUT", holeRecord);
}

export function deleteStrokeAPI(holeRecord) {
  return sendRequest(baseURL + "/record/stroke", "DELETE", holeRecord);
}

export function updateStatsAPI(holeDetails) {
  return sendRequest(baseURL + "/record", "PATCH", holeDetails);
}
