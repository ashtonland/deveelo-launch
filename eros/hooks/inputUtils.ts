export const removeSpaces = (input: string): string => {
	return input.replace(/\s+/g, "");
};

export const checkFileSize = (inputSize: number, limit: string): boolean => {
	const presets = new Map<string, number>();
	presets.set("2mb", 2000000); //2 million bytes
	presets.set("5mb", 5000000); //for gifs - usually 2.6 to 3.7

	if (presets.has(limit)) {
		const maxBytes = presets.get(limit);

		return inputSize <= maxBytes;
	}

	throw new Error(`file size limit: ${limit}, is not among the preset values in check file size`);
};
