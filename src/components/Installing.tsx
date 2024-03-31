import { useTranslation } from "react-i18next"
import { BarLoader } from "react-spinners"

const Installing = () => {
    const [ t ] = useTranslation()

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