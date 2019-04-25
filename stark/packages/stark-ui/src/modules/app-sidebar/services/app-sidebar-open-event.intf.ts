/**
 * Event to be emitted by the Stark App Sidebar service interface when it opens a sidebar
 */
export interface StarkAppSidebarOpenEvent {
	/**
	 * Mode of the open sidebar
	 */
	mode?: "regular" | "menu";

	/**
	 * Type of the open sidebar
	 */
	sidebar: "left" | "right";
}
