function setCookies(res, data) {
    if (data.setCookie) {
		for (const obj of data.setCookie) {
			const { key, value, options } = obj;
			const cookieOptions = options || {};

			res.cookie(key, value, cookieOptions);
		}
		data.setCookie = undefined;
	}
	if (data.destroyCookie) {
		for (const name of data.destroyCookie) {
			res.clearCookie(name);
		}
	}
}

module.exports = setCookies;