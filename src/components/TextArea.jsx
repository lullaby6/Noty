import { useRef, useEffect } from "react";

export default ({value, placeholder, reference, onChange}) => {
    if(!reference) reference = useRef('')

    function omChangeTextArea(e) {
        updateHeight()
        if(onChange) onChange(e)
    }

    function updateHeight(){
        reference.current.style.height = "auto"
        reference.current.style.height = reference.current.scrollHeight + "px"
    }

    useEffect(() => updateHeight());

    return <textarea ref={reference} onChange={e => omChangeTextArea(e)} placeholder={placeholder} spellcheck="false" defaultValue={value} className="text-lg focus:outline-none resize-none scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent overflow-x-hidden overflow-y-scroll max-h-64 bg-transparent placeholder:text-current placeholder:opacity-50 placeholder:italic"></textarea>
}