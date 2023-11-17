import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/profiles";

export function updateProfileAPI(profileData) {
  return sendRequest(baseURL, "PATCH", profileData);
}