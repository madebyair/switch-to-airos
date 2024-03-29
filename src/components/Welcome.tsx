import { useTranslation } from "react-i18next"
import Button from "./elements/Button.tsx"
import { useState } from "react"
import BetaWarning from "./BetaWarning.tsx"

const Welcome = () => {
    const [ t ] = useTranslation()
    const [warning, setWarning] = useState(false)

    return (
        <div className="relative h-full">
            {warning && <BetaWarning />}
            <h1 className="text-6xl font-bold">{t("Welcome")}</h1>
            <h2 className="w-96 mt-8">{t("Welcome to Airos! Say goodbye to limits, ugly interfaces and bugs. Experience a seamless transition to a world of limitless possibilities with Airos.")}</h2>
            <div className="absolute bottom-0">
                <Button submit={() => setWarning(true)} label={t("Continue")} />
            </div>
        </div>
    )
}

export default Welcome