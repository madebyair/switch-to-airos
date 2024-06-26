import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { optionState } from "../state/appState.ts"
import Button from "./elements/Button.tsx"
import { componentState } from "../state/componentState.tsx"
import Installing from "./Installing.tsx"

const Summary = () => {
    const [ t ] = useTranslation()
    const [option] = useAtomState(optionState)
    const [, setComponent] = useAtomState(componentState)

    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full relative">
                <h1 className="text-5xl font-bold">{t("All set. Are you ready?")}</h1>
                <div className="absolute bottom-0">
                    <Button label={t("Install")} submit={() => setComponent(<Installing />)} />
                </div>
            </div>
            <div className="w-1/2 h-full">
                <b>{t("Install method:")}</b> {option == "move" ? t("Keep data and install Airos") : t("Erase ALL data and install Airos")}<br />
                {option == "move" &&
                    <><b>{t("Files")}:</b> {t("Selected and from Magic Folder")}</>
                }
                {option == "move" &&
                    <div>
                        <b>{t("Apps")}</b>
                        <p>{t("We will not migrate your apps, although most of them will be reinstalled from the airstore.")}</p>
                        <p>{t("You can also save application data in the Magic Folder, which means you won't lose them.")}</p>
                    </div>
                }
                <br />
                {t("While installing Airos, your computer may restart several times.")}
                <p>{t("You will be able to use your computer normally until we send you a notification that your computer is ready to restart.")}</p>
                <br />
                <b>{t("If a window pops up asking you to accept the operation as Administrator, you must click Yes.")}</b>
            </div>
        </div>
    )
}

export default Summary