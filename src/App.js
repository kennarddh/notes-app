import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import Container from 'Components/Container/Container'
import NotesProvider from 'Contexts/Notes'
import ThemeProvider from 'Contexts/Theme'

import IsTouchDevice from 'Utils/IsTouchDevice'

const App = () => {
	return (
		<DndProvider backend={IsTouchDevice() ? TouchBackend : HTML5Backend}>
			<ThemeProvider>
				<NotesProvider>
					<Container />
				</NotesProvider>
			</ThemeProvider>
		</DndProvider>
	)
}

export default App
