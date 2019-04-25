/* tslint:disable:completed-docs*/
import { StarkLanguage } from "../../../configuration/entities/language";
import { StarkSortItem } from "../entities/metadata";
import { StarkHttpHeaders, StarkHttpQueryParameters } from "../constants";
import { StarkHttpFetchResourceRequestBuilder } from "./http-abstract-fetch-resource-request-builder.intf";
import { StarkAbstractHttpBaseRequestBuilder } from "./http-abstract-base-request-builder";
import { StarkResource } from "../entities/resource.entity.intf";
/**
 * @ignore
 */
export abstract class StarkAbstractHttpFetchResourceRequestBuilder<T extends StarkResource> extends StarkAbstractHttpBaseRequestBuilder<T>
	implements StarkHttpFetchResourceRequestBuilder {
	public addAcceptedLanguage(...languages: StarkLanguage[]): this {
		let languageHeaders: string = "";
		let queryParameters: string = "";

		if (this.request.headers && this.request.headers.has(StarkHttpHeaders.ACCEPT_LANGUAGE)) {
			languageHeaders = <string>this.request.headers.get(StarkHttpHeaders.ACCEPT_LANGUAGE);
		}

		if (this.request.queryParameters && this.request.queryParameters.has(StarkHttpQueryParameters.LANG)) {
			queryParameters = <string>this.request.queryParameters.get(StarkHttpQueryParameters.LANG);
		}

		for (const language of languages) {
			if (languageHeaders && languageHeaders.length > 0) {
				languageHeaders += ",";
			}
			if (queryParameters && queryParameters.length > 0) {
				queryParameters += ",";
			}

			if (language && language.isoCode) {
				languageHeaders += language.isoCode;
				queryParameters += language.isoCode;
			}
		}

		this.setHeader(StarkHttpHeaders.ACCEPT_LANGUAGE, languageHeaders);
		this.addQueryParameter(StarkHttpQueryParameters.LANG, queryParameters);

		return this;
	}

	public addFilterByInclude(...fields: string[]): this {
		if (this.request.queryParameters && this.request.queryParameters.has(StarkHttpQueryParameters.FIELDS)) {
			this.addQueryParameter(
				StarkHttpQueryParameters.FIELDS,
				this.request.queryParameters.get(StarkHttpQueryParameters.FIELDS) + "," + fields.join(",")
			);
		} else {
			this.addQueryParameter(StarkHttpQueryParameters.FIELDS, fields.join(","));
		}
		return this;
	}

	public addFilterByStyle(style: string): this {
		this.addQueryParameter(StarkHttpQueryParameters.STYLE, style);
		return this;
	}

	public addSortBy(...sortItems: StarkSortItem[]): this {
		if (this.request.queryParameters && this.request.queryParameters.has(StarkHttpQueryParameters.SORT)) {
			this.addQueryParameter(
				StarkHttpQueryParameters.SORT,
				this.request.queryParameters.get(StarkHttpQueryParameters.SORT) +
					"," +
					sortItems.map((sortBy: StarkSortItem) => sortBy.sortValue).join(",")
			);
		} else {
			this.addQueryParameter(StarkHttpQueryParameters.SORT, sortItems.map((sortBy: StarkSortItem) => sortBy.sortValue).join(","));
		}
		return this;
	}
}
