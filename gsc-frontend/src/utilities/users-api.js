import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/users";

export function signUpAPI(userData) {
  return sendRequest(baseURL + "/register", "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(baseURL + "/login", "POST", credentials);
}
