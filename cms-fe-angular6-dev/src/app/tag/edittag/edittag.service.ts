import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EditTagService {
    constructor (
        private http: HttpClient,
    ) {}

    public getTag (id: string) {
        return this.http.get(`/tag/${id}`);
    }

    public updateTag (data: any) {
        return this.http.put(`/tag/${data.id}`, data);
    }

}
