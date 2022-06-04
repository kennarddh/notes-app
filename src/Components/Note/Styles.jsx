import styled from 'styled-components'

export const StyledNote = styled.div`
	position: absolute;

	background-color: ${props =>
		props.isDragging === false
			? props => props.theme.background
			: 'transparent'};

	padding: 5px 10px;
	cursor: move;

	top: ${props => props.top}px;
	left: ${props => props.left}px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	border-radius: ${props => props.theme.borderRadius};
`

export const NoteTitle = styled.input`
	padding: 5px 10px;
	font-size: 16px;
	font-weight: bold;

	margin: 10px 0;

	color: ${props => props.theme.text};

	background-color: ${props => props.theme.light};

	border: none;
`

NoteTitle.defaultProps = {
	type: 'text',
}

export const NoteItemContainer = styled.div`
	overflow-y: auto;
	height: 200px;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background: ${props => props.theme.backgroundColor};
	}

	&::-webkit-scrollbar-thumb {
		background: ${props => props.theme.light};
		border-radius: ${props => props.theme.borderRadius};
	}
`
