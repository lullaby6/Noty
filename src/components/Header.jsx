import { useState, useRef } from "react"
import { Icon } from '@iconify/react';
import ThemeSwitcher from "./ThemeSwitcher";

export default function ({setNotes, setSearch}){
    const [showClearInput, setShowClearInput] = useState(false)
    const searchElement = useRef(null)

    const debounce = '400'
    let debounceTimeout = null

    function handleSearch(e){
        if(e.target.value.trim() == '' && showClearInput) setShowClearInput(false)
        else setShowClearInput(true)

        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
            setSearch(e.target.value)
        }, debounce)
    }

    function handleClearSearch(){
        searchElement.current.value = ''
        setSearch('')
        setShowClearInput(false)
    }

    return (
        <header className="flex items-center shadow-md border dark:border-neutral-800 border-b-neutral-300 gap-2 p-2 sticky top-0 left-0 w-full bg-white dark:bg-neutral-900 z-[100]">
            <div className="relative flex justify-center items-center border dark:focus-within:border-neutral-700 border-neutral-300 focus-withi:border-neutral-400 dark:border-neutral-800 rounded overflow-hidden w-full">
                <div onClick={handleClearSearch} className={"dark:bg-neutral-800 h-9 pl-2 pr-2 bg-neutral-100 " + (showClearInput && "cursor-pointer")}>
                    {showClearInput
                        ? <Icon icon="iconamoon:close" className="pointer-events-none cursor-pointer text-3xl text-neutral-500 dark:text-neutral-600 h-full"/>
                        : <Icon icon="material-symbols:search" className="text-3xl text-neutral-500 dark:text-neutral-600 h-full"/>
                    }
                </div>
                <input ref={searchElement} onChange={handleSearch} type="text" placeholder="Search note..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 focus:outline-none placeholder:italic dark:text-white text-neutral-800 text-xl w-full pl-2 p-1"/>
            </div>
            <ThemeSwitcher></ThemeSwitcher>
        </header>
    )
}