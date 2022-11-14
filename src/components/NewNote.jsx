import { Icon } from '@iconify/react'
import { useRef, useState, useEffect } from 'react'
import { HexColorPicker } from "react-colorful";

import TextArea from './TextArea'

export default (props) => {
    const title = useRef('')
    const text = useRef('')
    const [reload, setReload] = useState(false)
    const [showTextPalette, setShowTextPalette] = useState(false);
    const [textColor, setTextColor] = useState('');
    const [showBgPalette, setShowBgPalette] = useState(false);
    const [bgColor, setBgColor] = useState('');

    function clearNote(){
        title.current.value = ''
        text.current.value = ''
        setBgColor('')
        setTextColor('')
        setShowBgPalette(false)
        setShowTextPalette(false)
        setReload(!reload)
    }

    function addNote(){
        if(title.current.value.trim() != '' || text.current.value.trim() != ''){
            props.addNote({
                title: title.current.value,
                text: text.current.value,
                bgColor,
                textColor
            })

            clearNote()
        }
    }

    function copyText(){
        navigator.clipboard.writeText(
            `${title.current.value}\n${text.current.value}`.trim()
        )
    }

    useEffect(() => {
        console.log(`bg-[${bgColor}] `);
    });

    return (
        <div className={bgColor !== '' ? `break-inside-avoid-column rounded shadow-md border border-gray-300 gap-2 p-2 flex flex-col relative mb-4 bg-[${bgColor}] dark:border-none` : "break-inside-avoid-column rounded shadow-md border border-gray-300 gap-2 p-2 flex flex-col relative mb-4 dark:bg-neutral-900 dark:border-none"}>
            <Icon onClick={clearNote} className="cursor-pointer absolute text-gray-400 hover:text-gray-700 text-2xl md:text-xl top-0 right-0 m-1 dark:text-neutral-500 dark:hover:text-neutral-300" icon="eva:close-fill"/>
            <input ref={title} className="text-xl md:text-lg focus:outline-none font-semibold bg-transparent dark:placeholder:text-neutral-500" type="text" name="" id="" placeholder="Title" />
            <TextArea reference={text} placeholder="New note"></TextArea>
            <div className='flex justify-end gap-4'>
                <Icon onClick={copyText} className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="clarity:copy-line"></Icon>
                <div className='relative'>
                    <Icon onClick={() => setShowTextPalette(!showTextPalette)} className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="ic:round-format-color-text"></Icon>
                    {showTextPalette && <div className='absolute mt-1 z-10'>
                        <HexColorPicker color={textColor} onChange={setTextColor} />
                    </div>}
                </div>
                <div className='relative'>
                    <Icon onClick={() => setShowBgPalette(!showBgPalette)} className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="carbon:color-palette"></Icon>
                    {showBgPalette && <div className='absolute mt-1 z-10'>
                        <HexColorPicker color={bgColor} onChange={setBgColor} />
                    </div>}
                </div>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-lg md:text-md dark:text-neutral-500 dark:hover:text-neutral-300' onClick={addNote} icon="akar-icons:arrow-down"></Icon>
            </div>
        </div>
    )
}