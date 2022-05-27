import React, { useState } from 'react'

import { StyledNoteItem } from './Styles'

const NoteItem = ({ id, onChange, value, ...props }) => {
	const [Value, SetValue] = useState(value)

	const OnChange = event => {
		SetValue(event.target.value)
		onChange(id, event.target.value)
	}

	return <StyledNoteItem {...props} onChange={OnChange} value={Value} />
}

export default NoteItem
