import { Icon } from '@iconify/react';
import { useRef } from "react"
import { Fade } from "react-awesome-reveal";

export default function ({id, title, desc, removeNote}){
    const noteElement = useRef(null)
    const removeNoteAnimationDuration = 500

    function removeNoteAnimation(){
        noteElement.current.animate(
            [
                { opacity: "1" },
                { opacity: "0" }
            ],
            {
              fill: "forwards",
              duration: removeNoteAnimationDuration,
            },
        );
        setTimeout(() => {
            removeNote(id)
        }, removeNoteAnimationDuration)
    }

    return (
        <Fade duration={500}>
            <div>
                <div ref={noteElement} className="shadow-md flex flex-col border dark:hover:border-neutral-700 dark:focus-within:border-neutral-700 border-neutral-300 p-2 rounded focus-within:border-neutral-400 hover:border-neutral-400 dark:border-neutral-800 overflow-hidden">
                    <input  type="text" placeholder="Title..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 placeholder:italic text-xl text-neutral-800 dark:text-white focus:outline-none font-semibold" defaultValue={title}/>
                    <textarea rows="7" placeholder="Text..." spellCheck="false" autoComplete="off" className="bg-transparent dark:placeholder:text-neutral-800 placeholder:italic text-lg text-neutral-800 dark:text-white focus:outline-none resize-none scrollbar-thin dark:scrollbar-thumb-neutral-700 scrollbar-thumb-neutral-400 scrollbar-track-transparent" defaultValue={desc}></textarea>
                    <div className="flex justify-end gap-2">
                        <div onClick={removeNoteAnimation}>
                            <Icon className="text-2xl dark:text-white text-neutral-800 dark:opacity-10 dark:hover:opacity-100 opacity-50 hover:opacity-100 cursor-pointer" icon="material-symbols:delete-outline" />
                        </div>
                        {/* <div>
                            <Icon className="text-2xl dark:text-white text-neutral-800 dark:opacity-10 dark:hover:opacity-100 opacity-50 hover:opacity-100 cursor-pointer" icon="material-symbols:fullscreen" />
                        </div> */}
                    </div>
                </div>
            </div>
        </Fade>
    )
}