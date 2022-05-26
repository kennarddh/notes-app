import React, { useState } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'
import Note from 'Components/Note/Note'

const Container = () => {
	const [Notes, SetNotes] = useState({
		'6668fd28-9d52-4dae-8572-4ce2c1135a92': {
			left: 0,
			top: 0,
			notes: ['Note 1', 'Note 2'],
		},
	})

	const MoveNote = (id, left, top) => {
		SetNotes(notes => {
			return { ...notes, [id]: { ...notes[id], left, top } }
		})
	}

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
					<Note key={id} id={id} left={left} top={top}>
						{notes.toString()}
					</Note>
				)
			})}
		</div>
	)
}

export default Container
