import React, { useContext } from 'react'

import { useDrop } from 'react-dnd'

import Types from 'Constants/ReactDndTypes'
import Note from 'Components/Note/Note'

import { NotesContext } from 'Contexts/Notes'
import { ThemeContext } from 'Contexts/Theme'

import AddButton from 'Components/AddButton/AddButton'

import { StyledContainer } from './Styles'

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
		<StyledContainer
			ref={drop}
			style={{
				width: '100vw',
				height: '100vh',
			}}
		>
			<button onClick={Undo}>Undo</button>
			<button onClick={Redo}>Redo</button>
			<button onClick={() => Save('notes_data')}>Save</button>
			<button onClick={() => Load('notes_data')}>Load</button>
			<AddButton />
			<button
				onClick={() =>
					ChangeTheme(Theme === 'light' ? 'dark' : 'light')
				}
			>
				{Theme === 'light' ? 'Dark' : 'Light'} Mode
			</button>
			{Object.keys(Notes).map(id => (
				<Note key={id} id={id} hideSourceOnDrag />
			))}
		</StyledContainer>
	)
}

export default Container
