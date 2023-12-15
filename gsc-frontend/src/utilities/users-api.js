import sendRequest from "./send-request";

const baseURL = import.meta.env.VITE_BASE_URL + "users";

export function signUpAPI(userData) {
  return sendRequest(baseURL + "/register", "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(baseURL + "/login", "POST", credentials);
}
