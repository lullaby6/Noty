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

    return (
        <textarea ref={reference} onChange={e => omChangeTextArea(e)} placeholder={placeholder} defaultValue={value} className="text-md focus:outline-none resize-none overflow-hidden max-h-64" ></textarea>
    )
}