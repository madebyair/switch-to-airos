import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"
import { info, error } from "@tauri-apps/plugin-log"


const Requirements = () => {
    const [ t ] = useTranslation()
    const [reqs, setReqs] = useState({
        system_is_running_uefi: false
    })

    useEffect(() => {
        info("Starting requirements check")
        invoke("check_uefi").then((r) => {
            if (r) {
                info("System is running UEFI")
                setReqs(prevState => {
                    return {
                        ...prevState,
                        system_is_running_uefi: true
                    }
                })
                return
            }
            error("System is running LEGACY! (wtf so computers without UEFI still exists!?)")
        })
    }, [])

    return (
        <div className="h-full w-full flex">
            <div className="h-36 w-64 m-auto relative">
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
                <div className="h-36 w-64 absolue=te top-0 flex">
                    <div className="m-auto text-2xl font-bold">
                        {t("Just a second")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Requirements