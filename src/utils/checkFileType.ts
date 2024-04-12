export function checkFileType(file: File, acceptedTypes: string[]): boolean {
	if (!file?.name) return false;

	const fileType = file.name.split('.').pop()?.toLowerCase();

	return fileType != null && acceptedTypes.includes(fileType);
}
