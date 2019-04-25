/**
 * Interface that will define a path used in the breadcrumb component
 */
export interface StarkBreadcrumbPath {
	/**
	 * The unique id to be given to the link of this breadcrumb path
	 */
	id: string;

	/**
	 * The name of the state that will be navigated to
	 */
	state: string;

	/**
	 * The params needed for the state
	 */
	stateParams: { [param: string]: any };

	/**
	 * The key used to translate the label of the specific path. If empty, the path will be taken instead
	 */
	translationKey: string;
}
