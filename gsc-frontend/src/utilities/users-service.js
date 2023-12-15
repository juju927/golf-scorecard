import { signUpAPI, loginAPI } from "./users-api";

export async function signUpService(userData) {
  localStorage.removeItem("token");
  const data = await signUpAPI(userData);
  localStorage.setItem("token", data.data.token);
  return getUser();
}

export async function loginService(credentials) {
  localStorage.removeItem("token");
  const data = await loginAPI(credentials);
  localStorage.setItem("token", data.data.token);
  return getUser();
}

export async function logOutService() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (token === null) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token === null ? null : JSON.parse(atob(token.split(".")[1])).user;
}
