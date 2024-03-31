import { atom } from "@zedux/react"

export const optionState = atom<"move" | "delete">("option", "move")