/*tslint:disable:completed-docs*/
import { StarkSetPreferredLanguage } from "../actions";
import { StarkSettings } from "../entities";
import { settingsReducer } from "./settings.reducer";

const deepFreeze: Function = require("deep-freeze-strict");

describe("Reducer: SettingsReducer", () => {
	let settings: StarkSettings;

	beforeEach(() => {
		settings = { preferredLanguage: "FR" };
	});

	describe("on SET_PREFERRED_LANGUAGE", () => {
		it("should set the preferred language when state given", () => {
			// create the initial state object
			const initialState: Partial<StarkSettings> = {};
			deepFreeze(initialState); //Enforce immutability

			// Send the SET_PREFERRED_LANGUAGE action to the settingsReducer
			const changedState: StarkSettings = settingsReducer(<StarkSettings>initialState, new StarkSetPreferredLanguage("NL"));
			expect(changedState.preferredLanguage).toBe("NL");
		});
		it("should set the preferred language when state not defined", () => {
			// Send the SET_PREFERRED_LANGUAGE action to the settingsReducer
			const changedState: StarkSettings = settingsReducer(<any>undefined, new StarkSetPreferredLanguage("NL"));
			expect(changedState.preferredLanguage).toBe("NL");
		});
	});

	describe("on any other Action", () => {
		it("should invoke the default state", () => {
			const initialState: StarkSettings = settings;
			deepFreeze(initialState); //Enforce immutability

			// Send the MOCK_ACTION action to the settingsReducer
			const changedState: StarkSettings = settingsReducer(initialState, <any>{
				type: "MOCK_ACTION"
			});
			expect(changedState).toBe(initialState);
		});
	});
});
