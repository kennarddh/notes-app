import React from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'

const Container = () => {
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
		></div>
	)
}

export default Container
