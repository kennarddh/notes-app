import React, { createContext, useState } from 'react'

import DefaultNotes from 'Constants/DefaultNotes'

export const NotesContext = createContext({})

const NotesProvider = ({ children }) => {
	const [Notes, SetNotes] = useState(DefaultNotes)

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
