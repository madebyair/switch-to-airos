import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { componentState } from "../state/componentState.tsx"
import FilesToMove from "./FilesToMove.tsx"
import { invoke } from "@tauri-apps/api/core"
import { optionState } from "../state/appState.ts"
import Summary from "./Summary.tsx"

const InstallMethods = () => {
    const [ t ] = useTranslation()
    const [, setComponent] = useAtomState(componentState)
    const [, setOption] = useAtomState(optionState)

    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full">
                <h1 className="text-5xl font-bold">{t("What do you wanna do?")}</h1>
            </div>
            <div className="w-1/2 h-full">
                <div
                    onClick={() => {
                        setComponent(<FilesToMove />)
                        invoke("create_magic_folder")
                        setOption("move")
                    }}
                    className="w-full h-44 bg-slate-300 hover:bg-slate-300/50 dark:bg-zinc-900 dark:hover:bg-zinc-900/70 transition duration-300 rounded-md">
                    <div className="h-1/2 ml-4 flex">
                        <h1 className="font-medium text-lg mt-auto mb-auto">{t("Keep data and install Airos")}</h1>
                    </div>
                    <div className="h-12 ml-4 flex">
                        <p className="mt-auto mb-auto">{t("Keep data, and install Airos instead of Windows. You can select what data will be moved. Apps will be reinstalled.")}</p>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setComponent(<Summary />)
                        setOption("delete")
                    }}
                    className="w-full h-44 mt-8 bg-slate-300 hover:bg-slate-300/50 dark:bg-zinc-900 dark:hover:bg-zinc-900/70 transition duration-300 rounded-md">
                    <div className="h-1/2 ml-4 flex">
                        <h1 className="font-medium text-lg mt-auto mb-auto">{t("Erase ALL data and install Airos")}</h1>
                    </div>
                    <div className="h-12 ml-4 flex">
                        <p className="mt-auto mb-auto">{t("Delete ALL data, and install Airos. All your apps, documents and files will be DELETED!")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstallMethods