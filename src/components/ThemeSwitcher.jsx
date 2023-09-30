import { useState, useEffect } from "react"
import { Icon } from '@iconify/react';

export default function(){
    const [theme, setTheme] = useState(getTheme)

    function getDefaultTheme(){
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    }

    function getTheme(){
        if ('theme' in localStorage) return localStorage.theme
        return getDefaultTheme()
    }

    function toggleTheme() {
        setTheme(
            theme == 'light'
                ? 'dark'
                : 'light'
        )
    }

    useEffect(() => {
        localStorage.theme = theme

        if(theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [theme])

    return (
        <div onClick={toggleTheme} className="p-2 rounded-full dark:text-white dark:hover:bg-neutral-700 dark:bg-neutral-800 text-xl cursor-pointer opacity-50 hover:opacity-100 text-neutral-800 bg-neutral-200">
            {theme == 'light'
                ? <Icon icon="ph:moon-bold"/>
                : <Icon icon="ph:sun-bold"/>
            }
        </div>
    )

}