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
  return sendRequest(baseURL, "DELETE", roundId)
}

export function addStrokeAPI(strokeDetails) {
  return sendRequest(baseURL + "/record/stroke", "POST", strokeDetails);
}

export function editStrokeAPI(strokeDetails) {
  return sendRequest(baseURL + "/record/stroke", "PUT", strokeDetails)
}

export function deleteStrokeAPI(strokeDetails) {
  return sendRequest(baseURL + "/record/stroke", "DELETE", strokeDetails);
}

export function updateStatsAPI(holeDetails) {
  return sendRequest(baseURL + "/record", "PATCH", holeDetails);
}
