import React, { useContext } from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

import { NotesContext } from 'Contexts/Notes'

import NoteItem from 'Components/NoteItem/NoteItem'

import NoteDrop from 'Components/NoteDrop/NoteDrop'

import { StyledNote, NoteTitle, NoteItemContainer } from './Styles.jsx'

import Button, { ButtonContainer } from 'Components/Button/Button'

const Note = ({ id, hideSourceOnDrag }) => {
	const { Notes, ChangeNoteTitle, AddNoteItem, RemoveNote } =
		useContext(NotesContext)

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: Types.NOTE,
			item: { id, left: Notes[id].left, top: Notes[id].top },
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id, Notes[id].left, Notes[id].top]
	)

	const OnTitleChange = event => {
		ChangeNoteTitle(id, event.target.value)
	}

	if (isDragging && hideSourceOnDrag) {
		return <StyledNote ref={drag} />
	}

	return (
		<StyledNote
			ref={drag}
			left={Notes[id].left}
			top={Notes[id].top}
			isDragging={isDragging && hideSourceOnDrag}
		>
			<NoteTitle value={Notes[id].title} onChange={OnTitleChange} />
			<ButtonContainer>
				<Button onClick={() => AddNoteItem(id)}>Add</Button>
				<Button onClick={() => RemoveNote(id)}>Remove</Button>
			</ButtonContainer>
			{Notes[id].notes.length === 0 && <NoteDrop noteId={id} />}
			<NoteItemContainer>
				{Notes[id].notes.map(({ id: NoteItemId }, index) => (
					<NoteItem
						key={NoteItemId}
						id={NoteItemId}
						noteId={id}
						index={index}
					/>
				))}
			</NoteItemContainer>
		</StyledNote>
	)
}

export default Note
