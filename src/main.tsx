import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles.css"
import "./i18n.ts"
import { info } from "@tauri-apps/plugin-log"
import { getVersion } from "@tauri-apps/api/app"
import { arch, type, version } from "@tauri-apps/plugin-os"

getVersion().then((r) => {
    info("Starting Switch to Airos, version " + r)
})

async function logOs() {
    const architecture = await arch()
    const osType = await type()
    const osVersion = await version()

    info("Running on " + osType.charAt(0).toUpperCase() + osType.slice(1) + " " + osVersion + " (" + architecture + ")")
}

logOs()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
)
