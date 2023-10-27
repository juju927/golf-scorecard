import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/rounds"

export function startNewRoundAPI(settings) {
  return sendRequest(baseURL, "POST", settings);
}