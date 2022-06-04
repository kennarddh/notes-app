import React from 'react'

import { useDrag } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'

import Button from 'Components/Button/Button'

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

	if (isDragging) return <Button>Add</Button>

	return (
		<Button ref={drag} darker>
			Add
		</Button>
	)
}

export default AddButton
