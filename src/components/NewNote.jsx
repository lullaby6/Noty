import { Icon } from '@iconify/react';
import { useRef } from "react"

export default function ({addNote}){
    const titleElement = useRef(null)
    const descElement = useRef(null)

    function clearForm( ){
        titleElement.current.value = ''
        descElement.current.value = ''
    }

    return (
        <form onSubmit={e => addNote(e, clearForm)} className="shadow-md flex flex-col border dark:border-neutral-800 dark:hover:border-neutral-700 dark:focus-within:border-neutral-700 border-neutral-300 p-2 rounded focus-within:border-neutral-400 hover:border-neutral-400 ">
            <input ref={titleElement} type="text" name='title' placeholder="Title..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 dark:text-white placeholder:italic text-xl text-neutral-800 focus:outline-none font-semibold" />
            <textarea ref={descElement} rows="7" name='desc' placeholder="Text..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 dark:text-white placeholder:italic text-lg text-neutral-800 focus:outline-none resize-none scrollbar-thin dark:scrollbar-thumb-neutral-700 scrollbar-thumb-neutral-400 scrollbar-track-transparent"></textarea>
            <div className="flex justify-end">
                <button>
                    <Icon icon="tabler:arrow-up" rotate={2} className="text-2xl dark:text-white text-neutral-800 dark:opacity-10 dark:hover:opacity-100 opacity-50 hover:opacity-100 cursor-pointer"/>
                </button>
            </div>
        </form>
    )
}