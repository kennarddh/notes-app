import React, { createContext, useState } from 'react'

export const NotesContext = createContext({})

const NotesProvider = ({ children }) => {
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

	return (
		<NotesContext.Provider
			value={{ Notes, SetNotes, MoveNote, ChangeNoteItemText }}
		>
			{children}
		</NotesContext.Provider>
	)
}

export default NotesProvider