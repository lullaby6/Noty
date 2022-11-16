import {Icon} from '@iconify/react'

export default ({setNotes}) => {

    function downloadObjectAsJson(exportObj, exportName){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    function download(){
        const noty = JSON.parse(localStorage.getItem('noty'))
        downloadObjectAsJson(noty, 'Noty')
    }

    function onReaderLoad(event){
        const noty = JSON.parse(event.target.result)
        try {
            if('notes' in noty) setNotes(noty.notes)
        } catch (error) {}
    }

    function importJson(e){
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files[0]);
    }

    return (
        <div className="border rounded-full text-xl border-gray-300 px-2 py-1 flex justify-start dark:border-neutral-700 items-center gap-1">
            <Icon onClick={download} className='cursor-pointer text-gray-400 hover:text-gray-700 text-md dark:text-neutral-500 dark:hover:text-neutral-300' icon="charm:download"></Icon>
            <div className='relative overflow-hidden flex justify-center items-center cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300'>
                <input onChange={importJson} className='cursor-pointer opacity-0 absolute top-0 left-0' type="file"/>
                <Icon rotate='180deg' className='pointer-events-none cursor-pointer text-md ' icon="charm:download"></Icon>
            </div>
        </div>
    )
}