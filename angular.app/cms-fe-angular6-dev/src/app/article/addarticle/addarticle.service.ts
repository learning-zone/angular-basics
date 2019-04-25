import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class AddArticleService {
    constructor (
        private http: HttpClient,
        private params: Params,
    ) {}

    public insertArticle (data: any) {
        return this.http.post('/article', data);
    }

    public getTags () {
        return this.http.get('/tag?' + this.params.format({
            current_page: 1,
            per_page: 999,
        }));
    }

    public getTypes () {
        return this.http.get('/articletype?' + this.params.format({
            current_page: 1,
            per_page: 999,
        }));
    }

}
