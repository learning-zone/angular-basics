import { StarkLoggingState } from "../../modules/logging/reducers";
import { StarkSessionState } from "../../modules/session/reducers";
import { StarkSettingsState } from "../../modules/settings/reducers";
/**
 * Interface defining the shape of the application state of Stark Core (i.e., what's stored in Redux by Stark)
 */
export interface StarkCoreApplicationState extends StarkLoggingState, StarkSessionState, StarkSettingsState {
	// FIXME: still needed?
	// starkApplicationMetadata: StarkApplicationMetadata;
}
