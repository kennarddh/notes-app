import React from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

import { StyledNote } from './Styles.jsx'

const Note = ({ id, left, top, children }) => {
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

	if (isDragging) {
		return <StyledNote ref={drag} />
	}

	return (
		<StyledNote ref={drag} left={left} top={top}>
			{children}
		</StyledNote>
	)
}

export default Note
