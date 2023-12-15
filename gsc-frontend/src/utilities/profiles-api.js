import sendRequest from "./send-request";

const baseURL = import.meta.env.VITE_BASE_URL + "profiles";

export function updateProfileAPI(profileData) {
  return sendRequest(baseURL, "PATCH", profileData);
}