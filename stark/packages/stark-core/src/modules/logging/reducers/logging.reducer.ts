import { StarkLoggingActions, StarkLoggingActionTypes } from "../actions";
import { StarkLogging, StarkLogMessage } from "../entities";

/**
 * The store key will allow the application to find the reducer in the store
 */
export const starkLoggingStoreKey: string = "starkLogging";

/**
 * Defines the initial state of the reducer
 * @link StarkLogging
 */
const INITIAL_STATE: Readonly<StarkLogging> = {
	uuid: "",
	applicationId: "",
	messages: []
};

/**
 * Definition of the logging reducer.
 * @param state - the state of the reducer
 * @param action - the action to perform
 */
export function loggingReducer(
	state: Readonly<StarkLogging> = INITIAL_STATE,
	action: Readonly<StarkLoggingActions>
): Readonly<StarkLogging> {
	// the new state will be calculated from the data coming in the actions
	switch (action.type) {
		case StarkLoggingActionTypes.LOG_MESSAGE:
			const message: StarkLogMessage = action.message;
			return { ...state, messages: [...state.messages, message] };

		case StarkLoggingActionTypes.FLUSH_LOG:
			const numberOfMessagesToFlush: number = action.numberOfMessagesToFlush;
			const numberOfMessages: number = state.messages.length;
			const messages: StarkLogMessage[] = state.messages.slice(numberOfMessagesToFlush, numberOfMessages);

			return { ...state, messages: [...messages] };

		case StarkLoggingActionTypes.SET_LOGGING_APPLICATION_ID:
			return { ...state, applicationId: action.applicationId };

		default:
			return state;
	}
}
