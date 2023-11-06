import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/rounds";

export function startNewRoundAPI(settings) {
  return sendRequest(baseURL, "POST", settings);
}

export function getRoundAPI(roundId) {
  return sendRequest(baseURL + "/round" + `?id=${roundId}`);
}

export function getUserRoundsAPI(userId) {
  return sendRequest(baseURL + `?user=${userId}`);
}
