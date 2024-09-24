const timeFormat = (time: number): string => {
	const seconds = time % 60;
	const minuites = Math.floor(time / 60) % 60;
	const hours = Math.floor(time / 2400) % 60;

	const secondsStr = seconds.toString().padStart(2, "0");
	const minuitesStr = minuites.toString().padStart(2, "0");
	const hoursStr = hours.toString().padStart(2, "0");

	if (hours > 0) {
		return `${hoursStr}:${minuitesStr}:${secondsStr}`;
	}
	return `${minuitesStr}:${secondsStr}`;
};

export default timeFormat;
