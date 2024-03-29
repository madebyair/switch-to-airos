import { useAtomState } from "@zedux/react"
import { componentState } from "./state/componentState.tsx"

function App() {
    const [component] = useAtomState(componentState)

    return (
        <div className={window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"}>
            <div className="bg-slate-200 dark:bg-zinc-950 h-screen w-screen select-none flex dark:text-white bg">
                <div className="w-[800px] h-[500px] m-auto p-16 bg-zinc-200 dark:bg-zinc-950 rounded-md">
                    {component}
                </div>
            </div>
        </div>
    )
}

export default App
