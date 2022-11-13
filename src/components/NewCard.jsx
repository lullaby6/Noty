import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'

import TextArea from './TextArea'

export default (props) => {
    const title = useRef('')
    const text = useRef('')
    const [reload, setReload] = useState(false)

    function clearCard(){
        title.current.value = ''
        text.current.value = ''
        setReload(!reload)
    }

    function addCard(){
        if(title.current.value.trim() != '' || text.current.value.trim() != ''){
            props.addCard({
                title: title.current.value,
                text: text.current.value,
            })

            clearCard()
        }
    }

    function copyText(){
        navigator.clipboard.writeText(
            `${title.current.value}\n${text.current.value}`.trim()
        )
    }

    return (
        <div className="break-inside-avoid-column border border-gray-300 gap-2 p-2 flex flex-col text-gray-700 relative mb-4">
            <Icon onClick={clearCard} className="cursor-pointer absolute text-gray-400 hover:text-gray-700 text-xl top-0 right-0 m-1" icon="eva:close-fill"/>
            <input ref={title} className="text-lg focus:outline-none font-semibold" type="text" name="" id="" placeholder="Title" />
            <TextArea reference={text} placeholder="New note"></TextArea>
            <div className='flex justify-end gap-4'>
                <Icon onClick={copyText} className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' icon="clarity:copy-line"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' icon="ic:round-format-color-text"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' icon="carbon:color-palette"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' onClick={addCard} icon="akar-icons:arrow-down"></Icon>
            </div>
        </div>
    )
}