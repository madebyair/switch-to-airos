import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"
import { info, error } from "@tauri-apps/plugin-log"

type Booleanish = boolean | null

interface RequirementsState {
    system_is_running_uefi: Booleanish
    at_least_64_gb_freespace: Booleanish
}

const Requirements = () => {
    const [t] = useTranslation()
    const [reqs, setReqs] = useState<RequirementsState>({
        system_is_running_uefi: null,
        at_least_64_gb_freespace: null
    })

    useEffect(() => {
        info("Starting requirements check")
        invoke("check_uefi").then((r) => {
            if (r) {
                info("System is running UEFI")
                setReqs(prevState => ({
                    ...prevState,
                    system_is_running_uefi: true
                }))
                return
            }
            setReqs(prevState => ({
                ...prevState,
                system_is_running_uefi: false
            }))
            error("System is running LEGACY! (wtf so computers without UEFI still exists!?)")
        })

        invoke("check_freespace").then((r) => {
            if (r) {
                info("We got at least 64GB of free space :smile_with_sunglasses:")
                setReqs(prevState => ({
                    ...prevState,
                    at_least_64_gb_freespace: true
                }))
                return
            }
            setReqs(prevState => ({
                ...prevState,
                at_least_64_gb_freespace: false
            }))
            error("Not enough free space")
        })
    }, [])

    useEffect(() => {
        if (Object.values(reqs).every(value => value !== null)) {
            if (Object.values(reqs).every(value => value == true)) {
                info("All requirements are met")
            } else {
                error("At least one requirement are not met")
            }
        }
    }, [reqs])

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
                <div className="h-36 w-64 absolute top-0 flex">
                    <div className="m-auto text-2xl font-bold">
                        {t("Just a second")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Requirements