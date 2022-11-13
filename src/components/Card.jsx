import { Icon } from '@iconify/react'
import { useRef } from 'react'
import TextArea from './TextArea'

export default (props) => {

    const title = useRef('')
    const text = useRef('')

    function removeCard(){
        props.removeCard(props.id)
    }

    function updateCard(){
        props.updateCard({
            id: props.id,
            title: title.current.value,
            text: text.current.value
        })
    }

    function copyText(){
        navigator.clipboard.writeText(
            `${title.current.value}
            ${text.current.value}`.trim()
        )
    }

    return (
        <div className="break-inside-avoid-column border border-gray-300 gap-2 p-2 flex flex-col justify-between text-gray-700 relative mb-4">
            <div className='flex flex-col gap-2'>
                <input ref={title} onChange={updateCard} className="text-lg focus:outline-none font-semibold" placeholder='Title' defaultValue={props.title}/>
                <TextArea reference={text} onChange={updateCard} placeholder="New note" value={props.text}></TextArea>
            </div>
            <div className='flex justify-end gap-4'>
                <Icon onClick={copyText} className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' icon="clarity:copy-line"></Icon>
                <Icon className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' icon="carbon:color-palette"></Icon>
                <Icon onClick={removeCard} className='cursor-pointer text-gray-400 hover:text-gray-700 text-md' icon="ph:trash-bold"></Icon>
            </div>
        </div>
    )
}