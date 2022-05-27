import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Container from 'Components/Container/Container'
import NotesProvider from 'Contexts/Notes'

const App = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<NotesProvider>
				<Container />
			</NotesProvider>
		</DndProvider>
	)
}

export default App
