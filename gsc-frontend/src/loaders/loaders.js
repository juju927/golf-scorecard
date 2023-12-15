import toast from "react-hot-toast";
import { getUserRoundsService } from "../utilities/rounds-service";


export async function getUserRoundsLoader() {
  try {
    const rounds = await getUserRoundsService();
    return rounds 
  } catch (err) {
    toast.error(`${err.message}`)
  }
}
