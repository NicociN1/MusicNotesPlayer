import { ScoreProps } from "@/components/elements/Score/Score";

export const scoreScroller = (
	bpm: number,
	currentTime: number,
	scoreProps: ScoreProps,
) => {
	const oneBeatSeconds = 60 / bpm;
	const containerEl = document.querySelector("#scores-layout");

	if (!containerEl) return;

	const toPixel = (currentTime / oneBeatSeconds) * scoreProps.beatSize;
	const fromPixel = containerEl.scrollLeft;

	console.log(toPixel - fromPixel);

	containerEl.scrollBy({
		behavior: "smooth",
		left: toPixel - fromPixel,
	});
};

// import { useEffect } from "react";

// export const useAutoScroll = (
// 	containerSelector: string,
// 	bpm: number,
// 	distancePerBeat: number,
// 	isScrolling: boolean,
// ) => {
// 	useEffect(() => {
// 		if (!isScrolling) return;

// 		const msPerBeat = (60 / bpm) * 1000; // 1拍のミリ秒数
// 		let lastTimestamp: number | null = null;
// 		let animationFrameId: number;

// 		const scrollStep = (timestamp: number) => {
// 			if (lastTimestamp !== null) {
// 				const elapsed = timestamp - lastTimestamp; // 経過時間
// 				const distance = (distancePerBeat / msPerBeat) * elapsed; // このフレームで進むべき距離

// 				const containerEl = document.querySelector(containerSelector);
// 				if (containerEl) {
// 					containerEl.scrollLeft += distance;
// 				}
// 			}
// 			lastTimestamp = timestamp;
// 			animationFrameId = requestAnimationFrame(scrollStep); // 次のフレームをリクエスト
// 		};

// 		requestAnimationFrame(scrollStep);

// 		return () => cancelAnimationFrame(animationFrameId);
// 	}, [containerSelector, bpm, distancePerBeat, isScrolling]);
// };
