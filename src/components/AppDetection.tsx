import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { invoke } from "@tauri-apps/api/core"

const AppDetection = () => {
    const [ t ] = useTranslation()

    useEffect(() => {
        invoke("load_apps").then(() => {
            // TODO go to summary
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
                <div className="h-36 w-64 absolute top-0 flex">
                    <div className="m-auto text-2xl font-bold">
                        {t("Just a second")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppDetection