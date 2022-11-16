import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid";
import Masonry from 'react-masonry-css'

import Header from "./components/Header";
import Note from "./components/Note"

export default () => {
	const [search, setSearch] = useState('')
	const [columns, setColumns] = useState(1)

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

	function addNote(note) {
		const newNote = {
			id: uuidv4(),
			...note
		}

        setNotes([
            ...notes,
            newNote
        ])
    }

	function removeNote(id){
		setNotes(notes.filter(note => note.id !== id))
	}

	function updateNote(updateNoteProps){
		const updateNoteIndex = notes.findIndex(note => note.id === updateNoteProps.id)
		let updatedNotes = [...notes]
		updatedNotes[updateNoteIndex] = updateNoteProps
		setNotes(updatedNotes)
	}

	useEffect(() => {
		localStorage.setItem('noty', JSON.stringify({notes}))

		return () => {
			window.removeEventListener('resize', resize)
			function resize(){
				const width = window.innerWidth
				if(width <= 480){
					return setColumns(1)
				}else if(width <= 768){
					return setColumns(2)
				}else if(width <= 1024){
					return setColumns(3)
				}else{
					return setColumns(4)
				}
			}
			window.addEventListener('resize', resize)
			resize()
		}
	})

	return (
		<main className="min-h-screen overflow-x-hidden text-gray-700 dark:bg-neutral-800 dark:text-neutral-300">
			<Header setNotes={setNotes} setSearch={setSearch}></Header>
			<Masonry breakpointCols={columns} className="flex w-full gap-4 p-4">
				{search.trim() === '' && <Note add={true} addNote={addNote}></Note>}
				{notes.map(note => {
					if(search.trim() === ''){
						return <Note key={note.id} removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text} bgColor={note.bgColor} textColor={note.textColor}></Note>
					}else{
						if(note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase())) return <Note removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text}></Note>
					}
				})}
			</Masonry>
			{/* <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 bg-red-900 h-screen">
				{search.trim() === '' && <Note add={true} addNote={addNote}></Note>}
				{notes.map(note => {
					if(search.trim() === ''){
						return <Note key={note.id} removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text} bgColor={note.bgColor} textColor={note.textColor}></Note>
					}else{
						if(note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase())) return <Note removeNote={removeNote} updateNote={updateNote} id={note.id} title={note.title} text={note.text}></Note>
					}
				})}
			</div> */}
		</main>
	)
}