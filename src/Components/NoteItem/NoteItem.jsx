import React, { useContext, useRef, forwardRef } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'

import { NotesContext } from 'Contexts/Notes'

import { StyledNoteItem, NoteItemWrapper, RemoveButton } from './Styles'

const NoteItem = ({ id, noteId, index, ...props }, inputRef) => {
	const {
		ChangeNoteItemText,
		Notes,
		RemoveNoteItem,
		MoveNoteItem,
		AddNoteItem,
	} = useContext(NotesContext)

	const ref = useRef(null)

	const OnChange = event => {
		ChangeNoteItemText(noteId, id, event.target.value)
	}

	const [, drop] = useDrop({
		accept: Types.NOTE_ITEM,
		drop(item, monitor) {
			if (!ref.current) return

			const drag = { id: item.id, noteId: item.noteId, index: item.index }
			const hover = { id, noteId, index }

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
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: Types.NOTE_ITEM,
		item: () => {
			return { id, noteId, index }
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const OnKeyDown = event => {
		if (event.key === 'Enter') {
			AddNoteItem(noteId)
		}
	}

	drag(drop(ref))

	return (
		<NoteItemWrapper ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
			<StyledNoteItem
				{...props}
				ref={inputRef}
				onChange={OnChange}
				onKeyDown={OnKeyDown}
				value={Notes[noteId].notes[index].note}
			/>
			<RemoveButton onClick={() => RemoveNoteItem(noteId, id)}>
				&#x2716;
			</RemoveButton>
		</NoteItemWrapper>
	)
}

export default forwardRef(NoteItem)
