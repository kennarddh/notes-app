import React, { useContext, useRef } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'

import { NotesContext } from 'Contexts/Notes'

import { StyledNoteItem, NoteItemWrapper, RemoveButton } from './Styles'

const NoteItem = ({ id, noteId, index, ...props }) => {
	const { ChangeNoteItemText, Notes, RemoveNoteItem, MoveNoteItem } =
		useContext(NotesContext)

	const ref = useRef(null)

	const OnChange = event => {
		ChangeNoteItemText(noteId, id, event.target.value)
	}

	const [{ handlerId }, drop] = useDrop({
		accept: Types.NOTE_ITEM,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item, monitor) {
			if (!ref.current) return

			const dragIndex = item.index
			const hoverIndex = index

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) return

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
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

			// Time to actually perform the action
			MoveNoteItem(noteId, dragIndex, hoverIndex)

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: Types.NOTE_ITEM,
		item: () => {
			return { id, index }
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	drag(drop(ref))

	return (
		<NoteItemWrapper
			ref={ref}
			data-handler-id={handlerId}
			style={{ opacity: isDragging ? 0 : 1 }}
		>
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
