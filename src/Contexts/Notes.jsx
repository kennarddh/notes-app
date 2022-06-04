import React, { createContext } from 'react'

import { useHistoryState } from '@kennarddh/react-use-history-state'

import { v4 as uuid } from 'uuid'

import {
	Remove as ImmutableRemove,
	Insert as ImmutableInsert,
} from 'Utils/Immutable'

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

	const MoveNoteItem = (drag, hover) => {
		const noteItemHover = GetNoteItemByNoteId(hover.noteId, hover.id)
		const noteItemDrag = GetNoteItemByNoteId(drag.noteId, drag.id)

		if (drag.noteId !== hover.noteId) {
			const notesHover = ImmutableInsert(Notes[hover.noteId].notes, [
				[hover.index, noteItemDrag],
			])

			const notesDrag = ImmutableRemove(Notes[drag.noteId].notes, [
				drag.index,
			])

			console.log({
				...Notes,
				[hover.noteId]: {
					...Notes[hover.noteId],
					notes: notesHover,
				},
				[drag.noteId]: {
					...Notes[drag.noteId],
					notes: notesDrag,
				},
			})

			SetNotes(prevNotes => ({
				...prevNotes,
				[hover.noteId]: {
					...prevNotes[hover.noteId],
					notes: notesHover,
				},
				[drag.noteId]: {
					...prevNotes[drag.noteId],
					notes: notesDrag,
				},
			}))
		} else {
			const notes = Object.assign([], Notes[hover.noteId].notes, {
				[hover.index]: noteItemDrag,
				[drag.index]: noteItemHover,
			})

			SetNotes(prevNotes => ({
				...prevNotes,
				[hover.noteId]: {
					...prevNotes[hover.noteId],
					notes,
				},
			}))
		}
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
