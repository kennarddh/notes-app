import styled from 'styled-components'

export const StyledNoteItem = styled.input`
	padding: 5px 10px;
	font-size: 15px;

	margin: 10px 0;

	color: ${props => props.theme.text};
`

StyledNoteItem.defaultProps = {
	type: 'text',
}
