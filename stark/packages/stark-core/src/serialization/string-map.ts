import { Deserialize, ISerializable, Serialize } from "cerialize";

/**
 * Ssolution proposed by @weichx for Maps having string keys
 * in this way the custom behavior for handling ES6 Maps is defined once instead of doing it every time a Map is used
 * @link https://github.com/weichx/cerialize/issues/32
 * @link https://github.com/weichx/cerialize/issues/33
 * @param targetType - the type in which we want to serialize a file
 */
export const stringMap: Function = (targetType: any): ISerializable => {
	return {
		Serialize: (map: Map<string, any>): object => {
			const obj: object = {};
			map.forEach((value: any, key: string) => {
				obj[key] = Serialize(value);
			});
			return obj;
		},

		Deserialize: (json: any): Map<string, any> => {
			const map: Map<string, any> = new Map<string, any>();
			for (const key of Object.keys(json)) {
				map.set(key, Deserialize(json[key], targetType));
			}
			return map;
		}
	};
};
