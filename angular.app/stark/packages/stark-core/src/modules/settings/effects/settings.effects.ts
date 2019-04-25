import { Inject, Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { StarkSetPreferredLanguage, StarkSettingsActionTypes } from "../actions";
import { STARK_SESSION_SERVICE, StarkSessionService } from "../../session/services";

/**
 * This class is used to modified the settings of a session
 */
@Injectable()
export class StarkSettingsEffects {
	/**
	 * The session service
	 * @link StarkSessionService
	 */
	public sessionService: StarkSessionService;

	/**
	 * Class constructor
	 * @param actions$ - the action to perform
	 * @param sessionService - the session Service
	 */
	public constructor(private actions$: Actions, @Inject(STARK_SESSION_SERVICE) sessionService: StarkSessionService) {
		this.sessionService = sessionService;
	}

	/**
	 * The Set preferred language action will be used to change the language of the current session
	 * dispatch: false => because this effect does not dispatch an action
	 */
	@Effect({ dispatch: false })
	public setPreferredLanguage$(): Observable<void> {
		return this.actions$.pipe(
			ofType<StarkSetPreferredLanguage>(StarkSettingsActionTypes.SET_PREFERRED_LANGUAGE),
			map((action: StarkSetPreferredLanguage) => this.sessionService.setCurrentLanguage(action.language))
		);
	}
}
