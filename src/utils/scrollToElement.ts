export const scrollToElement = (
	targetSelector: string,
	containerSelector: string,
	duration: number,
) => {
	const target = document.querySelector(targetSelector);
	const container = document.querySelector(containerSelector);

	if (!target || !container) return;

	const start = window.scrollY;
	const targetPositionX = target.getBoundingClientRect().left || 0;
	const targetPositionY = target.getBoundingClientRect().top || 0;
	const startTime = performance.now();

	const animateScroll = (currentTime: number) => {
		if (!document.contains(target) || !document.contains(container)) return;

		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1);
		container.scrollTo(
			start + targetPositionX * progress,
			start + targetPositionY * progress,
		);

		if (progress < 1) {
			requestAnimationFrame(animateScroll);
		}
	};

	requestAnimationFrame(animateScroll);
};
