import sendRequest from "./send-request";

const baseURL = import.meta.env.VITE_BASE_URL + "golfclubs";

export function getGolfClubsAPI() {
  return sendRequest(baseURL);
}