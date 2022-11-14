import {Icon} from '@iconify/react'

import ThemeSwitcher from "./ThemeSwitcher";
import Tools from "./Tools";

export default ({setSearch, setNotes}) => {
    return (
        <header className="border-b border-gray-300 p-2 flex justify-start dark:border-neutral-700 items-center gap-2">
            <form className="flex items-center w-full text-xl border border-gray-300 rounded pl-2 dark:border-neutral-700">
                <Icon className="" icon="charm:search"></Icon>
                <input onChange={e => setSearch(e.target.value)} type="text" className="px-2 py-1 focus:outline-none w-full dark:bg-neutral-800 dark:placeholder:text-neutral-500" placeholder="Search note"/>
            </form>
            <Tools setNotes={setNotes}></Tools>
            <ThemeSwitcher></ThemeSwitcher>
        </header>
    )
}