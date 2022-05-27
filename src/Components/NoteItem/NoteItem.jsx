import React, { useState, useContext } from 'react'

import { NotesContext } from 'Contexts/Notes'

import { StyledNoteItem } from './Styles'

const NoteItem = ({ id, noteId, value, ...props }) => {
	const { ChangeNoteItemText } = useContext(NotesContext)

	const [Value, SetValue] = useState(value)

	const OnChange = event => {
		SetValue(event.target.value)
		ChangeNoteItemText(noteId, id, event.target.value)
	}

	return <StyledNoteItem {...props} onChange={OnChange} value={Value} />
}

export default NoteItem
