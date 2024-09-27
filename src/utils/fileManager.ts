export const upload: () => Promise<string> = () => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = ".json,.txt,.note";

	input.click();
	// ファイルが選択された時の処理
	return new Promise((resolve, reject) => {
		input.addEventListener("change", (event: Event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();

				reader.onload = (e) => {
					resolve(e.target?.result as string);
				};
				reader.onerror = (e) => {
					reject(e);
				};

				reader.readAsText(file);
			}
		});
	});
};
export const download = (data: string, fileName: string, mimeType?: string) => {
	const blob = new Blob([data], { type: mimeType });

	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = fileName;
	a.click();

	URL.revokeObjectURL(a.href);
};
