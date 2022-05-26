import styled from 'styled-components'

export const StyledNote = styled.div`
	position: absolute;
	border: 1px dashed gray;
	background-color: white;
	padding: 0.5rem 1rem;
	cursor: move;

	top: ${props => props.top}px;
	left: ${props => props.left}px;

	&:hover {
		border: 1px dashed gray;
	}
`
