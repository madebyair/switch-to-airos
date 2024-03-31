import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "./elements/Button.tsx"
import { invoke } from "@tauri-apps/api/core"
import { useAtomState } from "@zedux/react"
import { componentState } from "../state/componentState.tsx"
import AppDetection from "./AppDetection.tsx"

type Directory = {
    name: string,
    path: string,
    selected: boolean
};

const FilesToMove = () => {
    const [t] = useTranslation()
    const [directories, setDirectories] = useState<Array<Directory>>([{
        name: "Documents",
        path: "Documents",
        selected: true
    }])
    const [, setComponent] = useAtomState(componentState)

    useEffect(() => {
        invoke("whoami").then((r) => {
            const basePath = "C:\\Users\\" + r + "\\"

            setDirectories([
                {
                    name: t("Documents"),
                    path: basePath + "Documents",
                    selected: true
                },
                {
                    name: t("Pictures"),
                    path: basePath + "Pictures",
                    selected: true
                },
                {
                    name: t("Downloads"),
                    path: basePath + "Downloads",
                    selected: false
                },
                {
                    name: t("Videos"),
                    path: basePath + "Videos",
                    selected: true
                },
                {
                    name: t("Musics"),
                    path: basePath + "Musics",
                    selected: true
                },
                {
                    name: t("Content of Desktop"),
                    path: basePath + "Desktop",
                    selected: true
                }
            ])
        })
    }, [])

    const handleCheckboxChange = (index: number) => {
        const updatedDirectories = [...directories]
        updatedDirectories[index].selected = !updatedDirectories[index].selected
        setDirectories(updatedDirectories)
    }

    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full relative">
                <h1 className="text-5xl font-bold">{t("Select files, what you really love.")}</h1>
                <div className="absolute bottom-0">
                    <Button label={t("Continue")} submit={() => setComponent(<AppDetection />)} />
                </div>
            </div>
            <div className="w-1/2 h-full">
                <div className="h-12 w-full flex">
                    <div className="h-12 w-12 flex fill-black dark:fill-white">
                        <Icon />
                    </div>
                    <h1 className="text-xl font-bold my-auto">{t("Magic Folder")}</h1>
                </div>
                <p>{t("We've created the Magic Folder on your desktop. All files stored here will be moved to your new Airos. Do not store files in it that you have already marked below.")}</p>
                <div className="mt-4"><Button label={t("Open in Explorer")} submit={() => {
                    invoke("whoami").then((r) => {
                        invoke("open_explorer", { path: "file://C:\\Users\\" + r + "\\Desktop\\Magic Folder"})
                    })
                }} /></div>
                <div className="overflow-x-hidden overflow-y-auto h-52">
                    {directories && directories.map((dir, index) => {
                        return (
                            <div
                                key={dir.path}
                                className="w-full mt-2 h-12 bg-slate-300 hover:bg-slate-300/50 dark:bg-zinc-900 dark:hover:bg-zinc-900/70 transition duration-300 rounded-md"
                            >
                                <div className="h-full w-full flex relative">
                                    <div className="h-full w-12 flex fill-black dark:fill-white">
                                        <DirectoryIcon />
                                    </div>
                                    <h1 className="my-auto font-medium">{dir.name}</h1>
                                    <div className="h-full w-12 flex absolute right-0">
                                        <input
                                            type="checkbox"
                                            className="m-auto w-12 scale-125 accent-gray-800 "
                                            checked={dir.selected}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <span className="mt-4 font-medium">{t("Some of your files and directories are not listed here. Move them to the Magic Folder.")}</span>
                </div>
            </div>
        </div>
    )
}

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{margin: "auto"}}
        >
            <path
                d="M11 4l-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333L6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414L18.586 7 15 10.586 13.414 9 17 5.414z"></path>
        </svg>
    )
}

function DirectoryIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ msFilter: "", margin: "auto" }}
        >
            <path d="M20 5h-9.586L8.707 3.293A.997.997 0 008 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
        </svg>
    )
}

export default FilesToMove
