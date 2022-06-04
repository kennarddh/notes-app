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

	const Add = ({ top = 0, left = 0 }) => {
		const id = uuid()

		SetNotes(notes => ({
			...notes,
			[id]: {
				title: '',
				notes: [],
				top,
				left,
			},
		}))
	}

	const AddNoteItem = noteId => {
		SetNotes(notes => ({
			...notes,
			[noteId]: {
				...notes[noteId],
				notes: [
					...notes[noteId].notes,
					{
						id: uuid(),
						note: '',
					},
				],
			},
		}))
	}

	const RemoveNoteItem = (noteId, noteItemId) => {
		SetNotes(notes => ({
			...notes,
			[noteId]: {
				...notes[noteId],
				notes: notes[noteId].notes.filter(
					noteItem => noteItem.id !== noteItemId
				),
			},
		}))
	}

	const MoveNoteItem = (noteId, dragIndex, hoverIndex) => {
		const noteItemHover = Notes[noteId].notes[hoverIndex]
		const noteItemDrag = Notes[noteId].notes[dragIndex]

		const notes = Object.assign([], Notes[noteId].notes, {
			[hoverIndex]: noteItemDrag,
			[dragIndex]: noteItemHover,
		})

		SetNotes(prevNotes => ({
			...prevNotes,
			[noteId]: {
				...prevNotes[noteId],
				notes,
			},
		}))
	}

	const GetNoteItemByNoteId = (noteId, noteItemId) => {
		return Notes[noteId].notes.find(noteItem => noteItem.id === noteItemId)
	}

	const GetNoteItemIndex = (noteId, noteItemId) => {
		return Notes[noteId].notes.findIndex(
			noteItem => noteItem.id === noteItemId
		)
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
				AddNoteItem,
				RemoveNoteItem,
				MoveNoteItem,
				GetNoteItemByNoteId,
				GetNoteItemIndex,
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}

export default NotesProvider
