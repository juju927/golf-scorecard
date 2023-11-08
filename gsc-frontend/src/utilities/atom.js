import { atom } from "jotai"
import { getUser } from "./users-service"

export const currentRoundRecordAtom = atom({})

export const userAtom = atom(getUser())





