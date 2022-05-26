import styled from 'styled-components'

export const StyledNote = styled.div`
	position: absolute;
	border: 1px dashed gray;
	background-color: white;
	padding: 0.5rem 1rem;
	cursor: move;

	top: ${props => props.top};
	left: ${props => props.left};

	&:hover {
		border: 1px dashed gray;
	}
`
