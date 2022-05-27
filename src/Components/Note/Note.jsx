import React, { useContext } from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

import { NotesContext } from 'Contexts/Notes'

import NoteItem from 'Components/NoteItem/NoteItem'

import { StyledNote, NoteTitle } from './Styles.jsx'

const Note = ({ id, hideSourceOnDrag }) => {
	const { Notes } = useContext(NotesContext)

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
			<NoteTitle>{Notes[id].title}</NoteTitle>
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
