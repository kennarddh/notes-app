import React, { useContext, useRef } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'

import { NotesContext } from 'Contexts/Notes'

import { Container } from './Styles.jsx'

const NoteDrop = ({ noteId }) => {
	const { MoveNoteItem } = useContext(NotesContext)

	const ref = useRef(null)

	const [, drop] = useDrop({
		accept: Types.NOTE_ITEM,
		hover(item, monitor) {
			if (!ref.current) return

			const drag = { id: item.id, noteId: item.noteId, index: item.index }
			const hover = { id: 'defaultId', noteId, index: 0 }

			// Don't replace items with themselves
			if (drag.id === hover.id) return

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			// Determine mouse position
			const clientOffset = monitor.getClientOffset()

			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (drag.index < hover.index && hoverClientY < hoverMiddleY) return

			// Dragging upwards
			if (drag.index > hover.index && hoverClientY > hoverMiddleY) return

			// Time to actually perform the action
			MoveNoteItem(drag, hover)

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hover.index
		},
	})

	return <Container ref={drop(ref)} />
}

export default NoteDrop
