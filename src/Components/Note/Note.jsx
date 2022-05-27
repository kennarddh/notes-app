import React, { useContext,useState } from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

import { NotesContext } from 'Contexts/Notes'

import NoteItem from 'Components/NoteItem/NoteItem'

import { StyledNote, NoteTitle } from './Styles.jsx'

const Note = ({ id, hideSourceOnDrag }) => {
	const { Notes, ChangeNoteTitle } = useContext(NotesContext)

	const [Title, SetTitle] = useState(Notes[id].title)

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
		SetTitle(event.target.value)
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
			<NoteTitle value={Title} onChange={OnTitleChange} />
			{Notes[id].notes.map(({ id: NoteItemId, note }) => (
				<NoteItem
					key={NoteItemId}
					id={NoteItemId}
					noteId={id}
					value={note}
				/>
			))}
		</StyledNote>
	)
}

export default Note
