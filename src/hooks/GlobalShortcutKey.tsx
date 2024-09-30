import { useEffect } from "react";

interface ShortcutKey {
	key: string;
	ctrlKey?: boolean;
	altKey?: boolean;
	shiftKey?: boolean;
	action: (e: globalThis.KeyboardEvent) => void;
}

export const useGlobalShortcutKey = (shortcutKey: ShortcutKey[]) => {
	let subscribed = false;
	useEffect(() => {
		if (subscribed) return;
		subscribed = true;
		const handleKeydown = (event: globalThis.KeyboardEvent) => {
			for (const shortcut of shortcutKey) {
				if (
					event.key !== shortcut.key ||
					(event.ctrlKey || event.metaKey) !== !!shortcut.ctrlKey ||
					event.altKey !== !!shortcut.altKey ||
					event.shiftKey !== !!shortcut.shiftKey
				)
					continue;
				const cancelTags = ["INPUT", "TEXTAREA", "EMBED"];
				if (cancelTags.includes((event.target as HTMLElement).tagName)) continue;
				event.preventDefault();
				shortcut.action(event);
			}
		};

		document.addEventListener("keydown", handleKeydown);

		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	}, [shortcutKey, subscribed]);
};
