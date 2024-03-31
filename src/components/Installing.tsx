import { useTranslation } from "react-i18next"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"
import { info } from "@tauri-apps/plugin-log"
import axios from "axios"
import { invoke } from "@tauri-apps/api/core"
import { listen } from "@tauri-apps/api/event"

const Installing = () => {
    const [ t ] = useTranslation()

    useEffect(() => {
        info("Starting installation process")
        info("Fetching latest version of Gentoo (<3) Stage 3")
        axios.get("https://gentoo.oskarniziol.workers.dev/").then((r) => {
            const data = r.data
            const lines = data.split("\n")

            lines.forEach((line : string) => {
                if (line.includes("stage3")) {
                    const base = "https://distfiles.gentoo.org/releases/amd64/autobuilds/current-stage3-amd64-systemd/"
                    const file = line.split(" ")[0]
                    info("Latest download URL of Gentoo Stage 3 is: " + base + file)
                    invoke("download", { url: base + file, file: "C:\\airos\\stage3.tar.xz"})
                    listen<string>("download-finished", (r) => {
                        if (r.payload == base + file) {
                            info("Stage 3 downloading finished")
                        }
                    })
                }
            })
        })
    }, [])

    return (
        <div className="w-full h-full flex relative">
            <div className="w-1/2 h-full">
                <h1 className="text-5xl font-bold">{t("Installing Airos")}</h1>
            </div>
            <div className="w-1/2">
                <b>{t("If a window pops up asking you to accept the operation as Administrator, you must click Yes.")}</b>
                <p>{t("You can use your computer normally until we send you a notification that your computer is ready to restart.")}</p>
            </div>
            <div className="absolute bottom-0 w-full">
                <BarLoader
                    height={8}
                    cssOverride={{
                        width: "100%",
                        borderRadius: "10px"
                    }}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="#2563eb"
                />
            </div>
        </div>
    )
}

export default Installing