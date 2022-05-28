import React, { useContext } from 'react'

import { NotesContext } from 'Contexts/Notes'

import { StyledNoteItem } from './Styles'

const NoteItem = ({ id, noteId, index, ...props }) => {
	const { ChangeNoteItemText, Notes } = useContext(NotesContext)

	const OnChange = event => {
		ChangeNoteItemText(noteId, id, event.target.value)
	}

	return (
		<StyledNoteItem
			{...props}
			onChange={OnChange}
			value={Notes[noteId].notes[index].note}
		/>
	)
}

export default NoteItem
