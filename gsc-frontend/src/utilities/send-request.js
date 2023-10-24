import { getToken } from "./users-service";

export default async function sendRequest(
  url,
  method = "GET",
  payload = null,
  isFormData = false
) {
  const options = { method };
  if (payload) {
    if (!isFormData) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(payload);
    } else {
      options.body = payload;
    }
  }

  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  if (res.ok) {
    return res.json();
  } else {
    const errorRes = await res.json();
    throw new Error(errorRes.message);
  }
}
