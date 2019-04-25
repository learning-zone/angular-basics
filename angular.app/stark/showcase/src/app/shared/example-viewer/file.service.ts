import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { STARK_HTTP_SERVICE, StarkHttpService } from "@nationalbankbelgium/stark-core";

@Injectable()
export class FileService {
	public constructor(@Inject(STARK_HTTP_SERVICE) private httpService: StarkHttpService<any>) {}

	public fetchFile(path: string): Observable<string> {
		return this.httpService.rawHttpClient.get(path, { responseType: "text" });
	}
}
