import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
@Injectable()
export class ShopService {
    public url = '/api/shop';
    public urlMy = '/api/myshop/';
    public userId = '';
    
    constructor(public http:Http) {
    }

    getMy() {
        return this.http.get(this.urlMy)
            .map(res => res.json());
    }
    getAll() {
        return this.http.get(this.url)
            .map(res => res.json());
    }
    getUserShops(userId) {
        return this.http.get(this.urlMy + "/" + userId)
            .map(res => res.json());
    }

    get(id) {
        return this.http.get(this.url + "/" + id)
            .map(res => res.json());
    }
    
    create(data) {    
        return this.http.post(this.url, JSON.stringify(data),
        { headers: this.getHeaders()})
        .map(res => res.json());
    }
    delete(id) {
        return this.http.delete(`${this.url}/${id}`)
            .map(res => res.json());
    }
    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;

    }    

}
