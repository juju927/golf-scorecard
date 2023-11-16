import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/rounds";

export function startNewRoundAPI(settings) {
  return sendRequest(baseURL, "POST", settings);
}

export function getRoundAPI(roundId) {
  return sendRequest(baseURL + "/round" + `?id=${roundId}`);
}

export function getUserRoundsAPI() {
  return sendRequest(baseURL);
}

export function addStrokeAPI(strokeDetails) {
  return sendRequest(baseURL + "/record/stroke", "POST", strokeDetails);
}

export function deleteStrokeAPI(strokeDetails) {
  return sendRequest(baseURL + "/record/stroke", "DELETE", strokeDetails);
}

export function toggleGIRAPI(holeDetails) {
  return sendRequest(baseURL + "/record", "PATCH", holeDetails);
}
