import styled from 'styled-components'

export const StyledNote = styled.div`
	position: absolute;

	background-color: ${props =>
		props.isDragging === false ? '#eee' : 'transparent'};

	padding: 5px 10px;
	cursor: move;

	top: ${props => props.top}px;
	left: ${props => props.left}px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	border-radius: 15px;
`

export const NoteTitle = styled.input`
	padding: 5px 10px;
	font-size: 16px;
	font-weight: bold;

	margin: 10px 0;

	color: #333;

	&:disabled {
		color: #aaa;
	}
`

NoteTitle.defaultProps = {
	type: 'text',
}
