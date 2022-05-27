import React, { useCallback, useState } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'
import Note from 'Components/Note/Note'

const Container = () => {
	const [Notes, SetNotes] = useState({
		'6668fd28-9d52-4dae-8572-4ce2c1135a92': {
			left: 0,
			top: 0,
			notes: [
				{ id: 'c4a8dc18-08b2-4ffc-8a4e-4e7d838f2c94', note: 'Note 1' },
				{ id: '4ad0f9dd-a3c3-4cc8-8ab4-6853b354a05c', note: 'Note 2' },
			],
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

	const ChangeNoteItemText = (noteId, noteItemId, text) => {
		SetNotes(notes => {
			return {
				...notes,
				[noteId]: {
					...notes[noteId],
					notes: notes[noteId].notes.map(noteItem => {
						if (noteItem.id === noteItemId) {
							return { ...noteItem, note: text }
						}

						return noteItem
					}),
				},
			}
		})
	}

	const OnNoteChange = useCallback((noteId, id, text) => {
		ChangeNoteItemText(noteId, id, text)
	})

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
						onNoteChange={OnNoteChange}
						hideSourceOnDrag
					/>
				)
			})}
		</div>
	)
}

export default Container
