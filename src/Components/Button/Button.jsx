import styled from 'styled-components'

const Button = styled.button`
	padding: 5px 10px;
	font-size: 16px;
	font-weight: bold;

	margin: 10px 0;

	color: ${props => props.theme.text};

	background-color: ${props => props.theme.light};

	border-radius: ${props => props.theme.borderRadius};

	border: none;
`

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`

export default Button
