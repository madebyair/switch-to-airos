import { useAtomState } from "@zedux/react"
import { componentState } from "./state/componentState.tsx"

function App() {
    const [component] = useAtomState(componentState)

    return (
        <div className="bg-zinc-950 h-screen w-screen select-none flex text-white bg">
            <div className="w-[800px] h-[500px] m-auto p-16 bg-zinc-950 rounded-md">
                {component}
            </div>
        </div>
    )
}

export default App
