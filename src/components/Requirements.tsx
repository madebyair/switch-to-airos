import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { invoke } from "@tauri-apps/api/core"
import { useEffect } from "react"

const Requirements = () => {
    const [ t ] = useTranslation()

    useEffect(() => {
        invoke("check_uefi")
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