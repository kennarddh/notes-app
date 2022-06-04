import styled from 'styled-components'

export const StyledNoteItem = styled.input`
	padding: 5px 10px;
	font-size: 15px;

	margin: 10px 0;

	color: ${props => props.theme.text};

	background-color: ${props => props.theme.light};

	border: none;
`

StyledNoteItem.defaultProps = {
	type: 'text',
}

export const NoteItemWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
`

export const RemoveButton = styled.button`
	border: none;
	background-color: transparent;
	color: ${props => props.theme.text};
	font-size: 20px;
	cursor: pointer;
	border-radius: 5px;

	&:hover {
		color: ${props => props.theme.text};

		background-color: ${props => props.theme.light};
	}
`
