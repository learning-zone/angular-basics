import { Action } from "@ngrx/store";

/**
 * All the Settings action types
 */
export enum StarkSettingsActionTypes {
	PERSIST_PREFERRED_LANGUAGE = "[StarkSettings] Persist Preferred Language",
	PERSIST_PREFERRED_LANGUAGE_SUCCESS = "[StarkSettings] Persist Preferred Language Success",
	PERSIST_PREFERRED_LANGUAGE_FAILURE = "[StarkSettings] Persist Preferred Language Failure",
	SET_PREFERRED_LANGUAGE = "[StarkSettings] Set Preferred Language"
}

/**
 * Action that requires to persist the given language locally so that the language remains the same when the user comes back
 * @returns The created action object
 */
export class StarkPersistPreferredLanguage implements Action {
	/**
	 * The type of action
	 * @link StarkSettingsActionTypes
	 */
	public readonly type: StarkSettingsActionTypes.PERSIST_PREFERRED_LANGUAGE = StarkSettingsActionTypes.PERSIST_PREFERRED_LANGUAGE;

	/**
	 * Class constructor
	 * @param language - the language to persist
	 */
	public constructor(public language: string) {}
}

/**
 * Action that notifies the application that the preferred language was successfully persisted.
 * @returns The created action object
 */
export class StarkPersistPreferredLanguageSuccess implements Action {
	/**
	 * The type of action
	 */
	public readonly type: StarkSettingsActionTypes.PERSIST_PREFERRED_LANGUAGE_SUCCESS =
		StarkSettingsActionTypes.PERSIST_PREFERRED_LANGUAGE_SUCCESS;
}

/**
 * Action that notifies the application that the preferred language could not be persisted.
 * @returns The created action object
 */
export class StarkPersistPreferredLanguageFailureimplements implements Action {
	/**
	 * The type of action
	 */
	public readonly type: StarkSettingsActionTypes.PERSIST_PREFERRED_LANGUAGE_FAILURE =
		StarkSettingsActionTypes.PERSIST_PREFERRED_LANGUAGE_FAILURE;

	/**
	 * Class constructor
	 * @param error - the reason why the preferred language could not be persisted
	 */
	public constructor(public error: any) {}
}

/**
 * Action that notifies the application that the preferred language should be changed.
 * @returns The created action object
 */
export class StarkSetPreferredLanguage implements Action {
	/**
	 * The type of action
	 */
	public readonly type: StarkSettingsActionTypes.SET_PREFERRED_LANGUAGE = StarkSettingsActionTypes.SET_PREFERRED_LANGUAGE;

	/**
	 * Class constructor
	 * @param language - the new preferred language
	 */
	public constructor(public language: string) {}
}

export type StarkSettingsActions =
	| StarkPersistPreferredLanguage
	| StarkPersistPreferredLanguageSuccess
	| StarkPersistPreferredLanguageFailureimplements
	| StarkSetPreferredLanguage;
