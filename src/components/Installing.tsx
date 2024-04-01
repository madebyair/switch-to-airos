import { useTranslation } from "react-i18next"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"
import { info } from "@tauri-apps/plugin-log"
import axios from "axios"
import { invoke } from "@tauri-apps/api/core"
import { listen } from "@tauri-apps/api/event"
import getMirror from "../assets/mirrors.ts"

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
                    axios.get("http://www.geoplugin.net/json.gp").then((ip) => {
                        const mirror = getMirror(ip.data.geoplugin_countryCode)
                        info("Nearest (" + ip.data.geoplugin_countryCode + ") mirror is: " + mirror)
                        const base = mirror + "releases/amd64/autobuilds/current-stage3-amd64-systemd/"
                        const file = line.split(" ")[0]
                        info("Downloading aria2c")
                        info("Latest download URL of Gentoo Stage 3 is: " + base + file)
                        invoke("download", { url: "https://github.com/aria2/aria2/releases/download/release-1.37.0/aria2-1.37.0-win-64bit-build1.zip", file: "C:\\airos\\aria2c.zip"})
                        listen<string>("download-finished", (r) => {
                            if (r.payload == "https://github.com/aria2/aria2/releases/download/release-1.37.0/aria2-1.37.0-win-64bit-build1.zip") {
                                info("aria2c finished, unziping")
                                invoke("unzip", { file: "C:\\airos\\aria2c.zip"}).then(() => {
                                    info("aria2c installed! downloading stage 3 and ota package")
                                    invoke("download_aria", { url: base + file, file: "stage3.tar.xz"})
                                    listen<string>("download-finished", (r) => {
                                        if (r.payload == base + file) {
                                            info("Stage 3 downloading finished")
                                        }
                                    })
                                })
                            }
                        })
                    })
                }
            })
        })

        invoke("diskpart")
    }, [])

    return (
        <div className="w-full h-full flex relative">
            <div className="w-1/2 h-full">
                <h1 className="text-5xl font-bold">{t("Installing Airos")}</h1>
            </div>
            <div className="w-1/2">
                <b>{t("If a window pops up asking you to accept the operation as Administrator, you must click Yes.")}</b>
                <p>{t("You can use your computer normally until we send you a notification that your computer is ready to restart.")}</p>
                <p>{t("We are currently downloading files for airos, it may take 5-10 minutes to download the files, then we will send you a notification to restart your computer.")}</p>
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