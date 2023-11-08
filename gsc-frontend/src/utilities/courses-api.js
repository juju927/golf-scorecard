import sendRequest from "./send-request";

const baseURL = "http://localhost:3001/courses";

export function getCoursesAPI() {
  return sendRequest(baseURL);
}

