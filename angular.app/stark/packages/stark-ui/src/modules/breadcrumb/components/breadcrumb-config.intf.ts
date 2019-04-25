import { StarkBreadcrumbPath } from "./breadcrumb-path.intf";

/**
 * Interface that will define all paths to be displayed by the breadcrumb component
 */
export interface StarkBreadcrumbConfig {
	/**
	 * Array of {@link StarkBreadcrumbPath|StarkBreadcrumbPath} objects
	 */
	breadcrumbPaths: StarkBreadcrumbPath[];
}
