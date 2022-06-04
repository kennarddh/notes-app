export const Insert = (array, indexValueArray) => {
	return indexValueArray.reduce(
		(accumulator, [index, value]) => [
			...accumulator.slice(0, index),
			value,
			...accumulator.slice(index),
		],
		array
	)
}

export const Remove = (array, indexArray) => {
	return indexArray.reduce(
		(accumulator, index) => [
			...accumulator.slice(0, index),
			...accumulator.slice(index + 1),
		],
		array
	)
}
