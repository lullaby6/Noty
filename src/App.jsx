import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import Header from "./components/Header"
import Note from "./components/Note"
import NewNote from "./components/NewNote"

export default function App() {
	const [notes, setNotes] = useState(() =>
		'notes' in localStorage
			? JSON.parse(localStorage.notes)
			: []
	)
	const [search, setSearch] = useState('')

	function addNote(e, clearForm){
		e.preventDefault()
		const formData = new FormData(e.target)
  		const formProps = Object.fromEntries(formData)
		clearForm()
		setNotes([...notes, {...formProps, id: uuidv4()}])
	}

	function removeNote(id){
		setNotes(notes.filter(note => note.id !== id))
	}

	useEffect(() => {
		localStorage.notes = JSON.stringify(notes)
	}, [notes])

	return (
		<main className="bg-white dark:bg-neutral-900 min-h-screen flex flex-col">
			<Header setNotes={setNotes} setSearch={setSearch}></Header>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 max-h-screen overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-neutral-600 scrollbar-thumb-neutral-300 scrollbar-track-transparent">
				{search.trim() === '' && <NewNote addNote={addNote}/>}
				{notes.map(note => (
					search.trim() === ''
					? <Note key={note.id} {...note} removeNote={removeNote}/>
					: (note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase())) && <Note key={note.id} {...note} removeNote={removeNote}/>
				))}
			</div>
		</main>
	)
}
