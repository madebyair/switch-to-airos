import { useTranslation } from "react-i18next"

const Welcome = () => {
    const [ t ] = useTranslation()

    return (
        <div className="relative">
            <h1 className="text-6xl font-bold">{t("Welcome")}</h1>
            <h2 className="w-96">{t("Welcome to Airos! Say goodbye to limits, ugly interfaces and bugs. Experience a seamless transition to a world of limitless possibilities with Airos.")}</h2>
        </div>
    )
}

export default Welcome