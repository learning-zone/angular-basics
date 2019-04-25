import { UIRouter, Category, StateDeclaration } from "@uirouter/core";

export function logRegisteredStates(registeredStates: StateDeclaration[]): void {
	let message: string = "=============  Registered Ui-Router states: ==============\n";

	for (const state of registeredStates) {
		message += "State : " + state.name;
		message += " [";
		message += "parent: " + state.parent;
		message += ", url: " + state.url;
		message += ", abstract: " + state.abstract;
		message += "]\n";
	}
	message += "=======================================================";
	console.log(message);
}

export function routerConfigFn(router: UIRouter): void {
	router.trace.enable(Category.TRANSITION);
	// Enable UI-Router visualizer here if needed (for development purposes only)
	// if (ENV === "development") {
	// 	router.plugin(Visualizer);  // Visualizer should be imported from "@uirouter/visualizer"
	// }
}

export function routerChildConfigFn(router: UIRouter): void {
	logRegisteredStates(router.stateService.get());
}
