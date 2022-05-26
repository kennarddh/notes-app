import styled, { css } from 'styled-components'

export const StyledNote = styled.div`
	position: absolute;
	background-color: white;
	padding: 0.5rem 1rem;
	cursor: move;

	top: ${props => props.top}px;
	left: ${props => props.left}px;

	${props =>
		props.border &&
		css`
			border: 1px dashed gray;
		`}

	&:hover {
		border: 1px dashed gray;
	}
`
