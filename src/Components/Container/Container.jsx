import React, { useContext } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'
import Note from 'Components/Note/Note'

import { NotesContext } from 'Contexts/Notes'
import { ThemeContext } from 'Contexts/Theme'

import AddButton from 'Components/AddButton/AddButton'

import Button, { ButtonContainer } from 'Components/Button/Button'

import { StyledGridLines } from './Styles.jsx'

const Container = () => {
	const { Notes, MoveNote, Undo, Redo, Save, Load, Add } =
		useContext(NotesContext)

	const { ChangeTheme, Theme } = useContext(ThemeContext)

	const [, drop] = useDrop(
		() => ({
			accept: [Types.NOTE, Types.ADD],
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset()

				if (item.type === Types.ADD) {
					const top = delta.y
					const left = delta.x

					Add({ top, left })

					return
				}

				const left = item.left + delta.x
				const top = item.top + delta.y

				MoveNote(item.id, left, top)
			},
		}),
		[MoveNote]
	)

	return (
		<StyledGridLines cellWidth={30} strokeWidth={1}>
			<div
				ref={drop}
				style={{
					width: '100vw',
					height: '100vh',
				}}
			>
				<ButtonContainer
					style={{
						width: '35vw',
						height: '5vh',
					}}
				>
					<Button onClick={Undo} darker>
						Undo
					</Button>
					<Button onClick={Redo} darker>
						Redo
					</Button>
					<Button onClick={() => Save('notes_data')} darker>
						Save
					</Button>
					<Button onClick={() => Load('notes_data')} darker>
						Load
					</Button>
					<AddButton />
					<Button
						onClick={() =>
							ChangeTheme(Theme === 'light' ? 'dark' : 'light')
						}
						darker
					>
						{Theme === 'light' ? 'Dark' : 'Light'} Mode
					</Button>
				</ButtonContainer>
				{Object.keys(Notes).map(id => (
					<Note key={id} id={id} hideSourceOnDrag />
				))}
			</div>
		</StyledGridLines>
	)
}

export default Container
