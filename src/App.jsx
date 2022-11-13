import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid";
import {Icon} from '@iconify/react'

import Card from "./components/Card"
import NewCard from "./components/NewCard"

export default () => {
	const [cards, setCards] = useState(() => {
		let cards = []
		let noty = JSON.parse(localStorage.getItem('noty'))

		try {
			if('cards' in noty){
				cards = noty.cards
			}
		} catch (error) {}

		return cards
	})

	function addCard({title, text}){
        setCards([
            ...cards,
            {
				id: uuidv4(),
				title,
				text
			}
        ])
    }

	function removeCard(id){
		setCards(cards.filter(card => card.id !== id))
	}

	function updateCard(updateCardProps){
		setCards([
			...cards.filter(card => card.id !== updateCardProps.id),
			updateCardProps
		])
	}

	useEffect(() => {
		localStorage.setItem('noty', JSON.stringify({cards}))
	});

	return (
		<main>
			<header className="border-b border-gray-300 p-2 flex justify-start">
				<form className="flex items-center w-full text-gray-700 text-xl border border-gray-300 rounded pl-2">
					<Icon icon="charm:search"></Icon>
					<input type="text" className="px-2 py-1 focus:outline-none w-full" placeholder="Find note"/>
				</form>
			</header>
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
				<NewCard addCard={addCard}></NewCard>
				{cards.map(card => (
					<Card removeCard={removeCard} updateCard={updateCard} id={card.id} title={card.title} text={card.text}></Card>
				))}
			</div>
		</main>
	)
}