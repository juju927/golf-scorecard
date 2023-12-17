import toast from "react-hot-toast";
import { getUserRoundsService } from "../utilities/rounds-service";
import { getGolfClubsService } from "../utilities/golfclubs-service"


export async function getUserRoundsLoader() {
  try {
    const rounds = await getUserRoundsService();
    return rounds 
  } catch (err) {
    toast.error(`${err.message}`)
  }
}

export async function getGolfClubsLibraryLoader() {
  try {
    const golfClubs = await getGolfClubsService();
    return golfClubs
  } catch (err) {
    toast.error(`${err.message}`)
  }
}
