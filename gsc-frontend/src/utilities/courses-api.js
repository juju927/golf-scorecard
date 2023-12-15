import sendRequest from "./send-request";

const baseURL = import.meta.env.VITE_BASE_URL + "courses";

export function getCoursesAPI() {
  return sendRequest(baseURL);
}

