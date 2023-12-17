import { getGolfClubsAPI } from "./golfclubs-api";

export async function getGolfClubsService() {
  const data = await getGolfClubsAPI();
  return data.data.golfClubs;
}