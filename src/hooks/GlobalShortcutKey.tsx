import { useEffect } from "react";

export const useGlobalShortcutKey = (
	key: string,
	action: (event: globalThis.KeyboardEvent) => void,
) => {
	let subscribed = false;
	useEffect(() => {
		if (subscribed) return;
		subscribed = true;
		const handleKeydown = (event: globalThis.KeyboardEvent) => {
			if (event.key !== key) return;
			const cancelTags = ["INPUT", "TEXTAREA", "EMBED"];
			if (cancelTags.includes((event.target as HTMLElement).tagName)) return;
			event.preventDefault();
			action(event);
		};

		document.addEventListener("keydown", handleKeydown);

		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	}, [key, action, subscribed]);
};
