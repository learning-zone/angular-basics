import { InjectionToken } from "@angular/core";
import { StarkUser } from "../../../modules/user";
/**
 * The InjectionToken that defines the StarkApplicationConfig, in case an injection is needed.
 */
export const STARK_MOCK_DATA: InjectionToken<StarkMockData> = new InjectionToken<StarkMockData>("STARK_MOCK_DATA");

/**
 * Mock data entity
 * Describes how the mock data should look like when a developer wants to mock its backend data to be fetched via JSON Server
 */
export interface StarkMockData {
	[key: string]: any;
	profiles?: StarkUser[];
}
