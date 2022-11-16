import { useState, useEffect } from 'react'
import {Icon} from '@iconify/react'

export default () => {
    const [theme, setTheme] = useState('light')

    function changeTheme(theme){
        localStorage.setItem('theme', theme)
        theme === 'dark'
            ? window.document.documentElement.classList.add('dark')
            : window.document.documentElement.classList.remove('dark')
        setTheme(theme)
    }

    useEffect(() => {
        const LSTheme = localStorage.getItem('theme')
        if(LSTheme === null) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches) changeTheme('dark')
        }
        else if(LSTheme === 'dark') changeTheme('dark')
    }, [])

    return (
        <div className='flex gap border border-gray-300 dark:border-neutral-700 rounded-full justify-center items-center py-1 px-2 text-2xl'>
            {theme === 'light' && <>
                <Icon onClick={() => changeTheme('light')} className='rounded-full cursor-pointer p-1 bg-gray-600 text-white dark:text-neutral-700 dark:bg-neutral-300' icon="akar-icons:sun"></Icon>
                <Icon onClick={() => changeTheme('dark')} className='rounded-full cursor-pointer p-1 text-gray-400 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300' icon="bytesize:moon"></Icon>
            </>}
            {theme === 'dark' && <>
                <Icon onClick={() => changeTheme('light')} className='rounded-full cursor-pointer p-1 text-gray-400 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300' icon="akar-icons:sun"></Icon>
                <Icon onClick={() => changeTheme('dark')} className='rounded-full cursor-pointer p-1 bg-gray-600 text-white dark:text-neutral-700 dark:bg-neutral-300' icon="bytesize:moon"></Icon>
            </>}
        </div>
    )
}