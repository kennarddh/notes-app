import React, { useState } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'
import Note from 'Components/Note/Note'

const Container = () => {
	const [Notes] = useState([
		{
			id: '6668fd28-9d52-4dae-8572-4ce2c1135a92',
			left: 0,
			top: 0,
			notes: ['Note 1', 'Note 2'],
		},
	])

	const [, drop] = useDrop(
		() => ({
			accept: Types.NOTE,
		}),
		[]
	)

	return (
		<div
			ref={drop}
			style={{
				width: '100vw',
				height: '100vh',
			}}
		>
			{Notes.map(({ id, left, top, notes }) => {
				return (
					<Note key={id} left={left} top={top}>
						{notes.toString()}
					</Note>
				)
			})}
		</div>
	)
}

export default Container
