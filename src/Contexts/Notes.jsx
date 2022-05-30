import React, { createContext } from 'react'

import { useHistoryState } from '@kennarddh/react-use-history-state'

import { v4 as uuid } from 'uuid'

import DefaultNotes from 'Constants/DefaultNotes'

export const NotesContext = createContext({})

const NotesProvider = ({ children }) => {
	const [Notes, SetNotes, [Undo, Redo]] = useHistoryState(DefaultNotes)

	const MoveNote = (id, left, top) => {
		SetNotes(notes => ({ ...notes, [id]: { ...notes[id], left, top } }))
	}

	const ChangeNoteItemText = (noteId, noteItemId, text) => {
		SetNotes(notes => ({
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
		}))
	}

	const ChangeNoteTitle = (noteId, title) => {
		SetNotes(notes => ({ ...notes, [noteId]: { ...notes[noteId], title } }))
	}

	const Save = key => {
		localStorage.setItem(key, JSON.stringify(Notes))

		return true
	}

	const Load = key => {
		const data = localStorage.getItem(key)

		if (!data) return false

		const notes = JSON.parse(data)

		SetNotes(notes)

		return true
	}

	const Add = () => {
		const id = uuid()

		SetNotes(notes => ({
			...notes,
			[id]: {
				id,
				title: '',
				notes: [],
				left: 0,
				top: 0,
			},
		}))
	}

	return (
		<NotesContext.Provider
			value={{
				Notes,
				SetNotes,
				MoveNote,
				ChangeNoteItemText,
				ChangeNoteTitle,
				Undo,
				Redo,
				Save,
				Load,
				Add,
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}

export default NotesProvider
