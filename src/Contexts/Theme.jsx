import React, { createContext, useState } from 'react'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import DefaultTheme from 'Constants/Theme'

export const ThemeContext = createContext({})

const ThemeProvider = ({ children }) => {
	const [Theme, SetTheme] = useState('light')

	const ChangeTheme = theme => {
		if (!Object.keys(DefaultTheme).includes(theme)) return false

		SetTheme(theme)

		return true
	}

	return (
		<ThemeContext.Provider value={{ ChangeTheme }}>
			<StyledThemeProvider theme={DefaultTheme[Theme]}>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
