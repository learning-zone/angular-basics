/**
 * Util class that provides util methods to parse and interpolate URL params.
 */
export class StarkUrlUtil {
	/**
	 * Extracts all the expected parameters defined in the URL. These are defined by a placeholder like ":paramName".
	 * @param url - The URL containing the placeholders for URL parameters.
	 * @returns An array containing all the expected parameters defined in the URL (the placeholders ":paramName" that are present in the URL)
	 */
	public static parseUrlParams(url: string): string[] {
		const urlParams: string[] = [];
		const urlParamRegex: RegExp = /\/:(\w+)/g;
		let matchesArray: RegExpExecArray | null = urlParamRegex.exec(url);

		while (matchesArray) {
			urlParams.push(matchesArray[1]);

			matchesArray = urlParamRegex.exec(url);
		}

		return urlParams;
	}

	/**
	 * Interpolates the URL params with the given parameters object. It replaces the params placeholders with their corresponding values.
	 * @param url - The URL containing the placeholders for URL parameters.
	 * @param params - Object containing params name-value pairs to be replaced in the URL
	 * @returns The final URL with the parameters placeholders replaced by their corresponding values
	 */
	public static interpolateUrlWithParams(url: string, params: { [param: string]: string }): string {
		const expectedParams: string[] = StarkUrlUtil.parseUrlParams(url);
		for (const param of Object.keys(params)) {
			if (params[param]) {
				// only if the value is not undefined/null
				const expected: string | undefined = expectedParams.find((findExpected: string) => findExpected === param);
				if (!expected) {
					throw new Error(
						"StarkUrlUtil: Passing a param ( " + param + ") that is not in the url (expected " + expectedParams + "} )"
					);
				} else {
					url = url.replace(":" + param, () => params[param]);
					expectedParams.splice(expectedParams.indexOf(expected), 1);
				}
			}
		}
		if (expectedParams.length > 0) {
			throw new Error("StarkUrlUtil: Not every value was replaced, left over ones are: " + expectedParams);
		}
		return url;
	}
}
