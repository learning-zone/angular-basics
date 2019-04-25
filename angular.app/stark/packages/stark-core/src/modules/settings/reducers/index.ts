import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { StarkSettings } from "../entities";
import { StarkSettingsActions } from "../actions";
import { settingsReducer } from "./settings.reducer";

/**
 * We define part of the state assigned to the settings module
 */
export interface StarkSettingsState {
	/**
	 * The settings property
	 * @link StarkSettings
	 */
	settings: StarkSettings;
}

/**
 * We assign a reducer to our settings property
 */
export const starkSettingsReducers: ActionReducerMap<StarkSettingsState, StarkSettingsActions> = {
	/**
	 * the reducer is assigned to our property
	 */
	settings: settingsReducer
};

/**
 * This will create the session feature used by the selector to find the settings module in the state
 */
export const selectStarkSettingsFeature: MemoizedSelector<object, StarkSettingsState> = createFeatureSelector<StarkSettingsState>(
	"StarkSettings"
);

/**
 * The selector will return the part of the state assigned to the settings when called
 */
export const selectStarkSettings: MemoizedSelector<object, StarkSettings> = createSelector(
	selectStarkSettingsFeature,
	(state: StarkSettingsState) => state.settings
);
