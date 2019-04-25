import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ShopService {
  // The `public` keyword denotes that the constructor parameter will
  // be retained as a field.
    public url = '/api/shop';
    public urlMy = '/api/myshop/';

    public userId = '';

  //public urlDel=`/api/shop/`;
  
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

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/shop', JSON.stringify(data),
          {headers: headers})
        .map(res => res.json());
  }


  delete(id) {

      return this.http.delete(`${this.url}/${id}`)
          .map(res => res.json());
  }
}
