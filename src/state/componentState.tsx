import { atom } from "@zedux/react"
import Welcome from "../components/Welcome.tsx"

export const componentState = atom("component", <Welcome />)