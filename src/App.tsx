import {useTranslation} from "react-i18next"

function App() {
    const [ t ] = useTranslation()

    return (
        <div className="bg-zinc-950 h-screen w-screen select-none flex text-white bg">
            <div className="w-[800px] h-[500px] m-auto p-16 bg-zinc-950 rounded-md">
                <h1 className="text-6xl font-bold">{t("Welcome")}</h1>
                <h2 className="w-96">{t("Welcome to Airos! Say goodbye to limits, ugly interfaces and bugs. Experience a seamless transition to a world of limitless possibilities with Airos.")}</h2>
            </div>
        </div>
    )
}

export default App
