import { updateProfileAPI } from "./profiles-api";

export async function updateProfileService(profileData) {
  const data = await updateProfileAPI(profileData);
  return data.data;
}