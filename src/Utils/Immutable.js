export const Insert = (array, index, value) => {
	return [...array.slice(0, index), ...value, ...array.slice(index)]
}

export const Remove = (array, index) => {
	return [...array.slice(0, index), ...array.slice(index + 1)]
}
