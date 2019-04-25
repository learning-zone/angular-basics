/*tslint:disable:completed-docs*/
import { StarkSession } from "../entities";
import { StarkUser } from "../../user/entities";
import { sessionReducer } from "./session.reducer";
import { StarkChangeLanguageSuccess, StarkDestroySession, StarkInitializeSession } from "../actions";

const deepFreeze: Function = require("deep-freeze-strict");

describe("Reducer: SessionReducer", () => {
	let session: StarkSession;
	let user: StarkUser;

	beforeEach(() => {
		user = { uuid: "694", username: "sgonzales", firstName: "s", lastName: "gonzales", language: "FR", roles: [] };
		session = { currentLanguage: "FR", user: user };
	});

	describe("on CHANGE_LANGUAGE_SUCCESS", () => {
		it("should set the session language when state given", () => {
			// create the initial state object
			const initialState: Partial<StarkSession> = {};
			deepFreeze(initialState); //Enforce immutability

			// Send the CHANGE_LANGUAGE_SUCCESS action to the sessionReducer
			const changedState: StarkSession = sessionReducer(<StarkSession>initialState, new StarkChangeLanguageSuccess("NL"));
			expect(changedState.currentLanguage).toBe("NL");
		});

		it("should set the session language even if the state is not defined", () => {
			// Send the CHANGE_LANGUAGE_SUCCESS action to the sessionReducer
			const changedState: StarkSession = sessionReducer(<any>undefined, new StarkChangeLanguageSuccess("NL"));
			expect(changedState).toBeDefined();
			expect(changedState.currentLanguage).toBe("NL");
		});
	});

	describe("on INITIALIZE_SESSION", () => {
		it("should set the session user when state given", () => {
			// create the initial state object
			const initialState: Partial<StarkSession> = {};
			deepFreeze(initialState); //Enforce immutability

			// Send the INITIALIZE_SESSION action to the sessionReducer
			const changedState: StarkSession = sessionReducer(<StarkSession>initialState, new StarkInitializeSession(user));
			expect(changedState.user).toBe(user);
		});

		it("should set the session user even if the state is not defined", () => {
			// Send the INITIALIZE_SESSION action to the sessionReducer
			const changedState: StarkSession = sessionReducer(<any>undefined, new StarkInitializeSession(user));
			expect(changedState).toBeDefined();
			expect(changedState.user).toBe(user);
		});
	});

	describe("on DESTROY_SESSION", () => {
		it("should remove the session user when state given", () => {
			// create the initial state object
			const initialState: Partial<StarkSession> = { user: user };
			deepFreeze(initialState); //Enforce immutability

			// Send the EXPIRE_SESSION action to the sessionReducer
			const changedState: StarkSession = sessionReducer(<StarkSession>initialState, new StarkDestroySession());
			expect(changedState.user).toBeUndefined();
		});

		it("should set the user as undefined even if the state is not defined", () => {
			// Send the EXPIRE_SESSION action to the sessionReducer
			const changedState: StarkSession = sessionReducer(<any>undefined, new StarkDestroySession());
			expect(changedState).toBeDefined();
			expect(changedState.user).toBeUndefined();
		});
	});

	describe("on any other Action", () => {
		it("should invoke the default state", () => {
			const initialState: StarkSession = session;
			deepFreeze(initialState); //Enforce immutability

			// Send the MOCK_ACTION action to the sessionReducer
			const changedState: StarkSession = sessionReducer(initialState, <any>{
				type: "MOCK_ACTION"
			});

			expect(changedState).toBe(initialState);
		});
	});
});
