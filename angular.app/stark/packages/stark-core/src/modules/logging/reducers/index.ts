import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { StarkLogging } from "../entities";
import { StarkLoggingActions } from "../actions";
import { loggingReducer } from "./logging.reducer";

/**
 * We define part of the state assigned to the logging module
 */
export interface StarkLoggingState {
	/**
	 * The logging property
	 */
	logging: StarkLogging;
}

/**
 * We assign a reducer to our logging property
 */
export const starkLoggingReducers: ActionReducerMap<StarkLoggingState, StarkLoggingActions> = {
	/**
	 * the reducer is assigned to our property
	 */
	logging: loggingReducer
};

/**
 * The selector will return the part of the state assigned to the logging when called
 */
export const selectStarkLogging: MemoizedSelector<object, StarkLogging> = createSelector(
	createFeatureSelector<StarkLoggingState>("StarkLogging"),
	(state: StarkLoggingState) => state.logging
);
