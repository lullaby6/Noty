import { Icon } from '@iconify/react';
import { useEffect, useRef } from 'react';

export default function Modal({modalRef, modalTitleRef, modalTextRef, updateNote, closeModal, modalId}){
    return (
        <dialog ref={modalRef} className="relative w-4/5 md:w-3/4 lg:w-1/2 bg-white dark:bg-neutral-900 shadow-md border dark:hover:border-neutral-700 dark:focus-within:border-neutral-700 border-neutral-300 p-4 rounded focus-within:border-neutral-400 hover:border-neutral-400 dark:border-neutral-800 overflow-hidden ">
            <div className='bg-white dark:bg-neutral-900 flex flex-col gap-1'>
                <input ref={modalTitleRef} onChange={() => updateNote(modalId,modalTitleRef.current.value,modalTextRef.current.value)} type="text" placeholder="Title..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 placeholder:italic text-2xl text-neutral-800 dark:text-white focus:outline-none font-semibold"/>
                <textarea ref={modalTextRef} onChange={() => updateNote(modalId,modalTitleRef.current.value,modalTextRef.current.value)} rows="15" placeholder="Text..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 placeholder:italic text-xl text-neutral-800 dark:text-white focus:outline-none resize-none scrollbar-thin dark:scrollbar-thumb-neutral-700 scrollbar-thumb-neutral-400 scrollbar-track-transparent"></textarea>
                <div className="flex justify-end gap-2">
                    <button className='focus:outline-none absolute top-0 right-0 m-2' onClick={closeModal}>
                        <Icon icon="iconamoon:close" rotate={2} className="text-2xl dark:text-white text-neutral-800 dark:opacity-10 dark:hover:opacity-100 opacity-50 hover:opacity-100 cursor-pointer"/>
                    </button>
                </div>
            </div>
        </dialog>
    )
}