import { atom } from "jotai"
import { getUser } from "./users-service"

export const userAtom = atom(getUser())

export const userProfileAtom = atom(getUser()?.profile)

export const currentRoundRecordAtom = atom({})

