import React, { useContext } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'
import Note from 'Components/Note/Note'

import { NotesContext } from 'Contexts/Notes'

const Container = () => {
	const { Notes, MoveNote } = useContext(NotesContext)

	const [, drop] = useDrop(
		() => ({
			accept: Types.NOTE,
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset()

				const left = item.left + delta.x
				const top = item.top + delta.y

				MoveNote(item.id, left, top)

				return
			},
		}),
		[MoveNote]
	)

	return (
		<div
			ref={drop}
			style={{
				width: '100vw',
				height: '100vh',
			}}
		>
			{Object.keys(Notes).map(id => {
				const { left, top, notes } = Notes[id]

				return (
					<Note
						key={id}
						id={id}
						left={left}
						top={top}
						notes={notes}
						hideSourceOnDrag
					/>
				)
			})}
		</div>
	)
}

export default Container
