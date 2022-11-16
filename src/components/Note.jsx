import { Icon } from '@iconify/react'
import { HexColorPicker } from "react-colorful";
import { useRef, useState, useEffect } from 'react'

import TextArea from './TextArea'

export default (props) => {
    const title = useRef('')
    const text = useRef('')
    const [reload, setReload] = useState(false)
    const [showTextPalette, setShowTextPalette] = useState(false);
    const [textColor, setTextColor] = useState(props.textColor || '');
    const [showBgPalette, setShowBgPalette] = useState(false);
    const [bgColor, setBgColor] = useState(props.bgColor || '');

    const container = useRef('')

    function clearNote(){
        title.current.value = ''
        text.current.value = ''
        setBgColor('')
        setTextColor('')
        setShowBgPalette(false)
        setShowTextPalette(false)
        setReload(!reload)
        container.current.style.backgroundColor = null
        container.current.style.color = null
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

    function removeNote(){
        props.removeNote(props.id)
    }

    function updateBgColor(color){
        setBgColor(color)
        // setShowBgPalette(false)
        updateNote()
    }

    function updateTextColor(color){
        setTextColor(color)
        // setShowTextPalette(false)
        updateNote()
    }

    function updateNote(){
        if(!props.add) props.updateNote({
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

    useEffect(() => {
        if(bgColor && bgColor != '') container.current.style.backgroundColor = bgColor
        if(textColor && textColor != '') container.current.style.color = textColor
    });

    return (
        <div ref={container} className="relative rounded shadow-md gap-2 p-2 flex flex-col mb-4 dark:bg-neutral-900 dark:border-none">
            <input ref={title} autoFocus={props.add ? true : false} onChange={updateNote} className="text-xl md:text-lg placeholder:text-current placeholder:opacity-50 placeholder:italic focus:outline-none font-semibold bg-transparent" placeholder='Title' defaultValue={props.title}/>
            <TextArea reference={text} onChange={updateNote} placeholder={props.add ? "New note" : "Note"} value={props.text}></TextArea>
            <div className='flex justify-end gap-4'>
                <Icon onClick={copyText} className='cursor-pointer text-lg md:text-md opacity-50 hover:opacity-100' icon="clarity:copy-line"></Icon>
                <div className='relative'>
                    <Icon onClick={() => setShowTextPalette(!showTextPalette)} className='cursor-pointer text-lg md:text-md opacity-50 hover:opacity-100' icon="ic:round-format-color-text"></Icon>
                    {showTextPalette && <div className='mt-6 absolute z-10 right-0 top-0 aspect-square'>
                        <HexColorPicker onMouseUp={() => setShowTExtPalette(false)} color={textColor} onChange={updateTextColor} />
                    </div>}
                </div>
                <div className='relative'>
                    <Icon onClick={() => setShowBgPalette(!showBgPalette)} className='cursor-pointer text-lg md:text-md opacity-50 hover:opacity-100' icon="carbon:color-palette"></Icon>
                    {showBgPalette && <div className='mt-6 absolute z-10 right-0 top-0 aspect-square'>
                        <HexColorPicker onMouseUp={() => setShowBgPalette(false)} color={bgColor} onChange={updateBgColor} />
                    </div>}
                </div>
                {props.add
                    ? <>
                        <Icon onClick={clearNote} className="cursor-pointer absolute text-2xl md:text-xl top-0 right-0 m-1 opacity-50 hover:opacity-100" icon="eva:close-fill"/>
                        <Icon className='cursor-pointer text-lg md:text-md opacity-50 hover:opacity-100' onClick={addNote} icon="akar-icons:arrow-down"></Icon>
                    </>
                    :   <Icon onClick={removeNote} className='cursor-pointer text-lg md:text-md opacity-50 hover:opacity-100' icon="ph:trash-bold"></Icon>
                }
            </div>
        </div>
    )
}