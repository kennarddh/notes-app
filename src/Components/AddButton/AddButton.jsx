import React from 'react'

import { useDrag } from 'react-dnd'
import Types from 'Constants/ReactDndTypes'

const AddButton = () => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: Types.ADD,
			item: { type: Types.ADD },
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[]
	)

	if (isDragging) return <button>Add</button>

	return <button ref={drag}>Add</button>
}

export default AddButton
