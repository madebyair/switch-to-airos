import { RequirementsState } from "./Requirements.tsx"
import { useTranslation } from "react-i18next"

const CheckResults = ({reqs} : {reqs: RequirementsState}) => {
    const [ t ] = useTranslation()
    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-bold">{t("Some of the requirements are not met")}</h2>
            <p>{t("System is running UEFI:")} {reqs.system_is_running_uefi ? <>{t("Met")}</> : <>{t("Not met")}</>}</p>
            <p>{t("At least 64GB of free space:")} {reqs.at_least_64_gb_freespace ? <>{t("Met")}</> : <>{t("Not met")}</>}</p>

            <br /><br/>
            {t("You may be able to install the Airos system using the standard installer. (without this app)")}
        </div>
    )
}

export default CheckResults