import React from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

import { StyledNote, NoteItem } from './Styles.jsx'

const Note = ({ id, left, top, hideSourceOnDrag, notes }) => {
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
			{notes.map(({ id, note }) => (
				<NoteItem key={id}>{note}</NoteItem>
			))}
		</StyledNote>
	)
}

export default Note
