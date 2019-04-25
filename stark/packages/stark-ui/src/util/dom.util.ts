/**
 * Stark specific DOM commands
 */
export class StarkDOMUtil {
	/**
	 * Recursive function to look for the parent element with the specified tag name
	 * it will stop the recursion when it reaches the <body> element
	 * @param element - HTML element whose parent will be searched.
	 * @param tagName - Tag name of the parent element to be searched.
	 * @returns The searched element in case it was found, otherwise it returns undefined
	 */
	public static searchParentElementByTag(element: Element, tagName: string): Element | undefined {
		if (element.parentElement && element.parentElement.tagName === tagName.toUpperCase()) {
			return element.parentElement;
		} else if (element.parentElement && element.parentElement.tagName !== "BODY") {
			return StarkDOMUtil.searchParentElementByTag(element.parentElement, tagName);
		} else {
			return undefined;
		}
	}

	/**
	 * Recursive function to look for the parent element with the specified class
	 * it will stop the recursion when it reaches the <body> element
	 * @param element - HTML element whose parent will be searched
	 * @param className - Class name of the parent element to be searched
	 * @returns The searched element in case it was found, otherwise it returns undefined.
	 */
	public static searchParentElementByClass(element: Element, className: string): Element | undefined {
		if (element.parentElement && StarkDOMUtil.hasClass(element.parentElement, className)) {
			return element.parentElement;
		} else if (element.parentElement && element.parentElement.tagName !== "BODY") {
			return StarkDOMUtil.searchParentElementByClass(element.parentElement, className);
		} else {
			return undefined;
		}
	}

	/**
	 * Recursive function to look for the parent element with one of the specified classes
	 * it will stop the recursion when it reaches the <body> element
	 * @param element - HTML element whose parent will be searched
	 * @param classNames - Array containing the class names of the parent element to be searched
	 * @returns The searched element in case it was found, otherwise it returns undefined.
	 */
	public static searchParentElementByClasses(element: Element, classNames: string[]): Element | undefined {
		if (element.parentElement) {
			let parentElementHasClass: boolean = false;
			for (const className of classNames) {
				if (StarkDOMUtil.hasClass(element.parentElement, className)) {
					parentElementHasClass = true;
				}
			}
			if (parentElementHasClass) {
				return element.parentElement;
			} else if (element.parentElement.tagName !== "BODY") {
				return StarkDOMUtil.searchParentElementByClasses(element.parentElement, classNames);
			}
		}

		return undefined;
	}

	/**
	 * Recursive function to look for the parent element with the specified html id
	 * it will stop the recursion when it reaches the <body> element
	 * @param element - HTML element whose parent will be searched.
	 * @param htmlId - HTML id of the parent element to be searched.
	 * @returns The searched element in case it was found, otherwise it returns undefined.
	 */
	public static searchParentElementById(element: Element, htmlId: string): Element | undefined {
		if (element.parentElement && element.parentElement.id === htmlId) {
			return element.parentElement;
		} else if (element.parentElement && element.parentElement.tagName !== "BODY") {
			return StarkDOMUtil.searchParentElementById(element.parentElement, htmlId);
		} else {
			return undefined;
		}
	}

	/**
	 * Search starting at the root element and return the set of elements matching the given selector.
	 * @param rootElement - HTML element that will be the base for search selector.
	 * @param selector - CSS selector of the element(s) to be searched.
	 * @returns The list of nodes that were found, otherwise it returns undefined.
	 */
	public static getElementsBySelector(rootElement: Element, selector: string): NodeListOf<Element> {
		return rootElement.querySelectorAll(selector);
	}

	/**
	 * To check if an element has a certain class
	 * @param element - the element to be checked
	 * @param classname - the classname being searched
	 * @returns True if the element has the requested class
	 */
	public static hasClass(element: Element, classname: string): boolean {
		return element.classList.contains(classname);
	}
}
