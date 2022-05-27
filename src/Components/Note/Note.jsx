import React from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

import NoteItem from 'Components/NoteItem/NoteItem'

import { StyledNote } from './Styles.jsx'

const Note = ({ id, left, top, hideSourceOnDrag, notes, onNoteChange }) => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: Types.NOTE,
			item: { id, left, top },
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id, left, top]
	)

	if (isDragging && hideSourceOnDrag) {
		return <StyledNote ref={drag} />
	}

	return (
		<StyledNote
			ref={drag}
			left={left}
			top={top}
			isDragging={isDragging && hideSourceOnDrag}
		>
			{notes.map(({ id: NoteItemId, note }) => (
				<NoteItem
					key={NoteItemId}
					id={NoteItemId}
					onChange={(_, text) => onNoteChange(id, NoteItemId, text)}
					value={note}
				/>
			))}
		</StyledNote>
	)
}

export default Note
