const sleep = async (timeout: number): Promise<null> => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

export default sleep;
