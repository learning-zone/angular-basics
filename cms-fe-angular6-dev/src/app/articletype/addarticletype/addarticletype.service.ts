import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class AddArticleTypeService {
    constructor (
        private http: HttpClient,
        private params: Params,
    ) {}

    public addArticleType (data: any) {
        return this.http.post('/articletype', data);
    }

}
