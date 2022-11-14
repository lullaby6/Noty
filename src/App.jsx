import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import Note from "./components/Note"

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

	function addNote({title, text, bgColor, textColor}){
        setNotes([
            ...notes,
            {
				id: uuidv4(),
				title,
				text,
				bgColor,
				textColor
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
		<main className="min-h-screen text-gray-700 dark:bg-neutral-800 dark:text-neutral-300">
			<Header setNotes={setNotes} setSearch={setSearch}></Header>
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
				{search.trim() === '' && <Note add={true} addNote={addNote}></Note>}
				{notes.map(note => {
					if(search.trim() === ''){
						return <Note removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text} bgColor={note.bgColor} textColor={note.textColor}></Note>
					}else{
						if(note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase())) return <Note removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text}></Note>
					}
				})}
			</div>
		</main>
	)
}