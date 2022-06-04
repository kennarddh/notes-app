import React, { useContext } from 'react'

import { NotesContext } from 'Contexts/Notes'

import { StyledNoteItem, NoteItemWrapper, RemoveButton } from './Styles'

const NoteItem = ({ id, noteId, index, ...props }) => {
	const { ChangeNoteItemText, Notes, RemoveNoteItem } =
		useContext(NotesContext)

	const OnChange = event => {
		ChangeNoteItemText(noteId, id, event.target.value)
	}
	return (
		<NoteItemWrapper>
			<StyledNoteItem
				{...props}
				onChange={OnChange}
				value={Notes[noteId].notes[index].note}
			/>
			<RemoveButton onClick={() => RemoveNoteItem(noteId, id)}>
				X
			</RemoveButton>
		</NoteItemWrapper>
	)
}

export default NoteItem
