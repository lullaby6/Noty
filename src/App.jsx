import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import Header from "./components/Header"
import Note from "./components/Note"
import NewNote from "./components/NewNote"
import Modal from "./components/Modal"

export default function App() {
	const [notes, setNotes] = useState(() =>
		'notes' in localStorage
			? JSON.parse(localStorage.notes)
			: []
	)
	const [search, setSearch] = useState('')

	const [modalId, setModalId] = useState(null)
	const modalRef = useRef(null)
	const modalTitleRef = useRef(null)
	const modalTextRef = useRef(null)

	function addNote(e, clearForm){
		e.preventDefault()
		const formData = new FormData(e.target)
  		const formProps = Object.fromEntries(formData)
		clearForm()
		setNotes([...notes, {...formProps, id: uuidv4()}])
	}

	function updateNote(id, title, text){
		const updateNoteIndex = notes.findIndex(note => note.id === id)
		let updatedNotes = [...notes]
		updatedNotes[updateNoteIndex] = {id, title, text}
		setNotes(updatedNotes)
	}

	function removeNote(id){
		setNotes(notes.filter(note => note.id !== id))
	}

	const modalAnimationDuration = 300
	function openModal(id, title, text){
		setModalId(id)
		modalTitleRef.current.value = title
		modalTextRef.current.value = text

		modalRef.current.showModal()
		modalRef.current.animate(
			[
				{ opacity: "0" },
				{ opacity: "1" },
			],
			{
				fill: "forwards",
				duration: modalAnimationDuration,
				ease: 'ease-in-out'
			},
		);
	}

	function closeModal(){
		setModalId(null)
		modalRef.current.animate(
			[
				{ opacity: "1" },
				{ opacity: "0" }
			],
			{
			  fill: "forwards",
			  duration: modalAnimationDuration,
			  ease: 'ease-in-out'
			},
		)

		setTimeout(() => {
			modalRef.current.close()
		}, modalAnimationDuration)
	}

	useEffect(() => {
		localStorage.notes = JSON.stringify(notes)
	}, [notes])

	return (
		<main className="bg-white dark:bg-neutral-900 min-h-screen flex flex-col">
			<Modal modalRef={modalRef} closeModal={closeModal} updateNote={updateNote} modalTitleRef={modalTitleRef} modalTextRef={modalTextRef} modalId={modalId}></Modal>
			<Header setNotes={setNotes} setSearch={setSearch}></Header>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 max-h-screen overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-neutral-600 scrollbar-thumb-neutral-300 scrollbar-track-transparent">
				{search.trim() === '' && <NewNote addNote={addNote}/>}
				{notes.map(note => (
					search.trim() === ''
					? <Note updateNote={updateNote} key={note.id} {...note} removeNote={removeNote} modalRef={modalRef} setModalId={setModalId} openModal={openModal}/>
					: (note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase())) && <Note updateNote={updateNote} key={note.id} {...note} removeNote={removeNote} modalRef={modalRef} setModalId={setModalId} openModal={openModal}/>
				))}
			</div>
		</main>
	)
}
