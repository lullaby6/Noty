import { Icon } from '@iconify/react'
import { HexColorPicker } from "react-colorful";
import { useRef, useState } from 'react'

import TextArea from './TextArea'

export default (props) => {
    const title = useRef('')
    const text = useRef('')
    const [showTextPalette, setShowTextPalette] = useState(false);
    const [textColor, setTextColor] = useState('');
    const [showBgPalette, setShowBgPalette] = useState(false);
    const [bgColor, setBgColor] = useState('');

    function removeNote(){
        props.removeNote(props.id)
    }

    function updateNote(){
        props.updateNote({
            id: props.id,
            title: title.current.value,
            text: text.current.value,
            bgColor,
            textColor
        })
    }

    function copyText(){
        navigator.clipboard.writeText(
            `${title.current.value}\n${text.current.value}`.trim()
        )
    }

    return (
        <div className="break-inside-avoid-column rounded shadow-md border border-gray-300 gap-2 p-2 flex flex-col justify-between relative mb-4 dark:bg-neutral-900 dark:border-none">
            <input ref={title} onChange={updateNote} className="text-xl md:text-lg focus:outline-none font-semibold bg-transparent dark:placeholder:text-neutral-500" placeholder='Title' defaultValue={props.title}/>
            <TextArea reference={text} onChange={updateNote} placeholder="Note" value={props.text}></TextArea>
            <div className='flex justify-end gap-4'>
                <Icon onClick={copyText} className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="clarity:copy-line"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="ic:round-format-color-text"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="carbon:color-palette"></Icon>
                <Icon onClick={removeNote} className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="ph:trash-bold"></Icon>
            </div>
        </div>
    )
}