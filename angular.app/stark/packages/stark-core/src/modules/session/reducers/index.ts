import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { StarkSession } from "../entities";
import { StarkSessionActions } from "../actions";
import { sessionReducer } from "./session.reducer";

/**
 * We define part of the state assigned to the session module
 */
export interface StarkSessionState {
	/**
	 * The session property
	 * @link StarkSession
	 */
	session: StarkSession;
}

/**
 * We assign a reducer to our session property
 */
export const starkSessionReducers: ActionReducerMap<StarkSessionState, StarkSessionActions> = {
	/**
	 * the reducer is assigned to our property
	 */
	session: sessionReducer
};

/**
 * This will create the session feature used by the selector to find the session module in the state
 */
export const selectStarkSessionFeature: MemoizedSelector<object, StarkSessionState> = createFeatureSelector<StarkSessionState>(
	"StarkSession"
);

/**
 * The selector will return the part of the state assigned to the logging when called
 */
export const selectStarkSession: MemoizedSelector<object, StarkSession> = createSelector(
	selectStarkSessionFeature,
	(state: StarkSessionState) => state.session
);
