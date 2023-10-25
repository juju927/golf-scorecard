import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/courses";

export function getCoursesAPI() {
  return sendRequest(baseURL);
}

export function loginAPI(credentials) {
  return sendRequest(baseURL + "/login", "POST", credentials);
}
