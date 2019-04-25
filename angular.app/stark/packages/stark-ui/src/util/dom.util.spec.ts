import { StarkDOMUtil } from "./dom.util";

/**
 * Creates a 'div' element that surrounds the html code passed by the parameter.
 * @param html the html code that is inserted inside the div
 * @returns an html element
 */
function createElement(html: string): Element {
	const div: Element = document.createElement("div");
	div.innerHTML = html.trim();
	return <Element>div.firstChild;
}

/* tslint:disable:no-big-function */
describe("Util: DOMUtil", () => {
	/* repeated messages */
	const shouldReturnParentElement: string = "should return the parent element if it is found";
	const shouldReturnUndefined: string = "should return UNDEFINED if the parent element was not found";
	const shouldStopSearching: string = "should stop searching when it reaches the BODY element";
	const notParent: string = "this-is-not-a-parent";
	const rootClass: string = "root-class";

	const rootClassHtml: string = "<root class='root-class'>";
	const grandparentParentChildHtml: string =
		"<grandparent class='grandparent-class' id='grandparent-id'>" +
		"	<parent class='parent-class' id='parent-id'>" +
		"		<child class='child-class' id='child-id'></child>" +
		"	</parent>" +
		"</grandparent>";

	let mockChildElement: Element;
	let mockDOM: Element;

	beforeEach(() => {
		mockDOM = createElement(
			"<root class='root-class' id='root-id'>" +
				"	<grandparent class='grandparent-class second-grandparent-class' id='grandparent-id'>" +
				"		<parent class='parent-class' id='parent-id'>" +
				"			<child class='child-class' id='child-id'></child>" +
				"		</parent>" +
				"	</grandparent>" +
				"</root>"
		);

		mockChildElement = <Element>mockDOM.querySelector("child");
	});

	describe("searchParentElementByTag", () => {
		it(shouldReturnParentElement, () => {
			let result: Element = <Element>StarkDOMUtil.searchParentElementByTag(mockChildElement, "root");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("ROOT");

			result = <Element>StarkDOMUtil.searchParentElementByTag(mockChildElement, "grandparent");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("GRANDPARENT");

			result = <Element>StarkDOMUtil.searchParentElementByTag(mockChildElement, "parent");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("PARENT");
		});

		it(shouldReturnUndefined, () => {
			let result: undefined = <undefined>StarkDOMUtil.searchParentElementByTag(mockChildElement, "child");
			expect(result).toBeUndefined();

			result = <undefined>StarkDOMUtil.searchParentElementByTag(mockChildElement, notParent);
			expect(result).toBeUndefined();
		});

		it(shouldStopSearching, () => {
			const mockGrandParentElement: Element = createElement(grandparentParentChildHtml);

			const mockBodyElement: Element = document.createElement("body");
			mockBodyElement.appendChild(mockGrandParentElement);

			const mockDOMWithBody: Element = createElement(rootClassHtml).appendChild(mockBodyElement);

			mockChildElement = <Element>mockDOMWithBody.querySelector("child");

			const result: undefined = <undefined>StarkDOMUtil.searchParentElementByTag(mockChildElement, "root");

			// should not find the root element because it's one level above the BODY element
			expect(result).toBeUndefined();
		});
	});

	describe("searchParentElementByClass", () => {
		it(shouldReturnParentElement, () => {
			let result: Element = <Element>StarkDOMUtil.searchParentElementByClass(mockChildElement, rootClass);

			expect(result).toBeDefined();
			expect(result.tagName).toBe("ROOT");

			result = <Element>StarkDOMUtil.searchParentElementByClass(mockChildElement, "grandparent-class");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("GRANDPARENT");

			result = <Element>StarkDOMUtil.searchParentElementByClass(mockChildElement, "parent-class");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("PARENT");
		});

		it(shouldReturnUndefined, () => {
			let result: undefined = <undefined>StarkDOMUtil.searchParentElementByClass(mockChildElement, "child-class");
			expect(result).toBeUndefined();

			result = <undefined>StarkDOMUtil.searchParentElementByClass(mockChildElement, notParent);
			expect(result).toBeUndefined();
		});

		it(shouldStopSearching, () => {
			const mockGrandParentElement: Element = createElement(grandparentParentChildHtml);

			const mockBodyElement: Element = document.createElement("body");
			mockBodyElement.appendChild(mockGrandParentElement);

			const mockDOMWithBody: Element = createElement(rootClassHtml).appendChild(mockBodyElement);

			mockChildElement = <Element>mockDOMWithBody.querySelector("child");

			const result: undefined = <undefined>StarkDOMUtil.searchParentElementByClass(mockChildElement, rootClass);

			// should not find the root element because it's one level above the BODY element
			expect(result).toBeUndefined();
		});
	});

	describe("searchParentElementByClasses", () => {
		it(shouldReturnParentElement, () => {
			let result: Element = <Element>StarkDOMUtil.searchParentElementByClasses(mockChildElement, [rootClass]);

			expect(result).toBeDefined();
			expect(result.tagName).toBe("ROOT");

			result = <Element>(
				StarkDOMUtil.searchParentElementByClasses(mockChildElement, ["fake-grandparent-class", "second-grandparent-class"])
			);

			expect(result).toBeDefined();
			expect(result.tagName).toBe("GRANDPARENT");

			result = <Element>StarkDOMUtil.searchParentElementByClasses(mockChildElement, ["parent-class"]);

			expect(result).toBeDefined();
			expect(result.tagName).toBe("PARENT");
		});

		it(shouldReturnUndefined, () => {
			let result: undefined = <undefined>StarkDOMUtil.searchParentElementByClasses(mockChildElement, ["child-class"]);
			expect(result).toBeUndefined();

			result = <undefined>StarkDOMUtil.searchParentElementByClasses(mockChildElement, [notParent]);
			expect(result).toBeUndefined();
		});

		it(shouldStopSearching, () => {
			const mockGrandParentElement: Element = createElement(grandparentParentChildHtml);

			const mockBodyElement: Element = document.createElement("body");
			mockBodyElement.appendChild(mockGrandParentElement);

			const mockDOMWithBody: Element = createElement(rootClassHtml).appendChild(mockBodyElement);
			mockChildElement = <Element>mockDOMWithBody.querySelector("child");

			const result: undefined = <undefined>StarkDOMUtil.searchParentElementByClasses(mockChildElement, [rootClass]);

			// should not find the root element because it's one level above the BODY element
			expect(result).toBeUndefined();
		});
	});

	describe("searchParentElementById", () => {
		it(shouldReturnParentElement, () => {
			let result: Element = <Element>StarkDOMUtil.searchParentElementById(mockChildElement, "root-id");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("ROOT");

			result = <Element>StarkDOMUtil.searchParentElementById(mockChildElement, "grandparent-id");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("GRANDPARENT");

			result = <Element>StarkDOMUtil.searchParentElementById(mockChildElement, "parent-id");

			expect(result).toBeDefined();
			expect(result.tagName).toBe("PARENT");
		});

		it(shouldReturnUndefined, () => {
			let result: undefined = <undefined>StarkDOMUtil.searchParentElementById(mockChildElement, "child-id");
			expect(result).toBeUndefined();

			result = <undefined>StarkDOMUtil.searchParentElementById(mockChildElement, notParent);
			expect(result).toBeUndefined();
		});

		it(shouldStopSearching, () => {
			const mockGrandParentElement: Element = createElement(grandparentParentChildHtml);

			const mockBodyElement: Element = document.createElement("body");
			mockBodyElement.appendChild(mockGrandParentElement);

			const mockDOMWithBody: Element = createElement(rootClassHtml).appendChild(mockBodyElement);

			mockChildElement = <Element>mockDOMWithBody.querySelector("child");

			const result: undefined = <undefined>StarkDOMUtil.searchParentElementById(mockChildElement, "root-id");

			// should not find the root element because it's one level above the BODY element
			expect(result).toBeUndefined();
		});
	});
});
