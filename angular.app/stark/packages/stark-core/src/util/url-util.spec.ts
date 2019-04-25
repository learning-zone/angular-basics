import { StarkUrlUtil } from "./url-util";

describe("Util: UrlUtil", () => {
	const fullTestUrl: string = "/something/:somethingId/else/:elseId";

	describe("parseUrlParams", () => {
		it("should return the words after the colon till the next slash", () => {
			let result: string[] = StarkUrlUtil.parseUrlParams(fullTestUrl);
			expect(result).toEqual(["somethingId", "elseId"]);

			result = StarkUrlUtil.parseUrlParams("/:id/whatever/:anotherId/:extraParam/");
			expect(result).toEqual(["id", "anotherId", "extraParam"]);

			result = StarkUrlUtil.parseUrlParams("/:someParam/:some/:anything/:");
			expect(result).toEqual(["someParam", "some", "anything"]);

			result = StarkUrlUtil.parseUrlParams("/:someParam/:someParam/");
			expect(result).toEqual(["someParam", "someParam"]);
		});

		it("should return an empty array when there are no words between a colon and the next slash", () => {
			let result: string[] = StarkUrlUtil.parseUrlParams("/url/with/no/params/:/");
			expect(result).toEqual([]);

			result = StarkUrlUtil.parseUrlParams(":notValid/");
			expect(result).toEqual([]);

			result = StarkUrlUtil.parseUrlParams("");
			expect(result).toEqual([]);

			result = StarkUrlUtil.parseUrlParams(<any>undefined);
			expect(result).toEqual([]);
		});
	});

	describe("interpolateUrlWithParams", () => {
		it("should return an url where the placeholders are replaced with the params", () => {
			let result: string = StarkUrlUtil.interpolateUrlWithParams(fullTestUrl, {
				somethingId: "1",
				elseId: "5"
			});

			expect(result).toEqual("/something/1/else/5");

			result = StarkUrlUtil.interpolateUrlWithParams("/:id/something/:anotherId/:extraParam/", {
				id: "1",
				anotherId: "5",
				extraParam: "xyz"
			});

			expect(result).toEqual("/1/something/5/xyz/");
		});

		it("should support urls with paths in kebab-case", () => {
			const result: string = StarkUrlUtil.interpolateUrlWithParams("/some-thing/:somethingId/anything-else/:elseId", {
				somethingId: "1",
				elseId: "5"
			});

			expect(result).toEqual("/some-thing/1/anything-else/5");
		});

		it("should throw an error if a param is passed but there is no placeholder for it in the resourcePath", () => {
			expect(() =>
				StarkUrlUtil.interpolateUrlWithParams(fullTestUrl, {
					somethingId: "1",
					elseId: "5",
					unknownId: "3"
				})
			).toThrowError(/unknownId/);
		});

		it("should NOT throw an error if a param with undefined value is passed and there is no placeholder for it in the resourcePath", () => {
			const result: string = StarkUrlUtil.interpolateUrlWithParams(fullTestUrl, {
				somethingId: "1",
				elseId: "5",
				unknownId: <any>undefined
			});

			expect(result).toEqual("/something/1/else/5");
		});

		it("should throw an error if a parameter from the url is missing in the given params object", () => {
			expect(() =>
				StarkUrlUtil.interpolateUrlWithParams(fullTestUrl, {
					somethingId: "1"
				})
			).toThrowError(/Not every value was replaced/);
		});

		it("should throw an error if a parameter from the url exists in the params object but it has undefined value", () => {
			expect(() =>
				StarkUrlUtil.interpolateUrlWithParams(fullTestUrl, {
					somethingId: "1",
					elseId: <any>undefined
				})
			).toThrowError(/Not every value was replaced/);
		});
	});
});
