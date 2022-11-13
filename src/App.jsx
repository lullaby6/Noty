import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid";
import {Icon} from '@iconify/react'

import Note from "./components/Note"
import NewNote from "./components/NewNote";

export default () => {
	const [search, setSearch] = useState('')

	const [notes, setNotes] = useState(() => {
		let notes = []
		let noty = JSON.parse(localStorage.getItem('noty'))

		try {
			if('notes' in noty){
				notes = noty.notes
			}
		} catch (error) {}

		return notes
	})

	function addNote({title, text}){
        setNotes([
            ...notes,
            {
				id: uuidv4(),
				title,
				text
			}
        ])
    }

	function removeNote(id){
		setNotes(notes.filter(note => note.id !== id))
	}

	function updateNote(updateNoteProps){
		setNotes([
			...notes.filter(note => note.id !== updateNoteProps.id),
			updateNoteProps
		])
	}

	useEffect(() => {
		localStorage.setItem('noty', JSON.stringify({notes}))
	});

	return (
		<main>
			<header className="border-b border-gray-300 p-2 flex justify-start">
				<form className="flex items-center w-full text-gray-700 text-xl border border-gray-300 rounded pl-2">
					<Icon className="text-gray-600" icon="charm:search"></Icon>
					<input onChange={e => setSearch(e.target.value)} type="text" className="px-2 py-1 focus:outline-none w-full" placeholder="Search note"/>
				</form>
			</header>
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
				<NewNote addNote={addNote}></NewNote>
				{notes.map(note => {
					if(search.trim() === ''){
						return <Note removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text}></Note>
					}else{
						if(note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase())) return <Note removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text}></Note>
					}
				})}
			</div>
		</main>
	)
}