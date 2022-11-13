import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'

import TextArea from './TextArea'

export default (props) => {
    const title = useRef('')
    const text = useRef('')
    const [reload, setReload] = useState(false)

    function clearNote(){
        title.current.value = ''
        text.current.value = ''
        setReload(!reload)
    }

    function addNote(){
        if(title.current.value.trim() != '' || text.current.value.trim() != ''){
            props.addNote({
                title: title.current.value,
                text: text.current.value,
            })

            clearNote()
        }
    }

    function copyText(){
        navigator.clipboard.writeText(
            `${title.current.value}\n${text.current.value}`.trim()
        )
    }

    return (
        <div className="break-inside-avoid-column shadow-md border border-gray-300 gap-2 p-2 flex flex-col relative mb-4 dark:bg-neutral-900 dark:border-neutral-700">
            <Icon onClick={clearNote} className="cursor-pointer absolute text-gray-400 hover:text-gray-700 text-2xl md:text-xl top-0 right-0 m-1 dark:text-neutral-500 dark:hover:text-neutral-300" icon="eva:close-fill"/>
            <input ref={title} className="text-xl md:text-lg focus:outline-none font-semibold dark:bg-neutral-900 dark:placeholder:text-neutral-500" type="text" name="" id="" placeholder="Title" />
            <TextArea reference={text} placeholder="New note"></TextArea>
            <div className='flex justify-end gap-4'>
                <Icon onClick={copyText} className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="clarity:copy-line"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="ic:round-format-color-text"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="carbon:color-palette"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' onClick={addNote} icon="akar-icons:arrow-down"></Icon>
            </div>
        </div>
    )
}