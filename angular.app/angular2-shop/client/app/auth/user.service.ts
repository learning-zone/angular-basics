import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

//This is used as an shared/global class 
//We create only once instance of this class 
@Injectable()
export class UserService {

// Static/Shared Variables
  public id: string;
  public email: string;
  public username: string;
  public currency: string;

  public isLogged: boolean;
  public isSeller: boolean;
  public isBuyer: boolean;
  public isAdmin: boolean;

  
  public latitude: number;
  public longitude: number;
		
  public urlSignup='/api/auth/signup';
  public urlSignin = '/api/auth/signin';
  public urlCart = '/api/cart';
  public urlOrder = '/api/order';
  public urlUserProfile = '/api/secure/user/profile/';
  

  public shopId: string;
  public shopTitle: string;

  public location: any;
  public profile: any = {firstName:''};

  public address: any;
  public map_address: any;

  public cart: any = [];
  public cartItems: any = [];
  public cartOptions: any = [];




  constructor(public http:Http) {

  }

  check(data) {
      console.log('in');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let r = this.http.post(this.urlSignin, JSON.stringify(data),
          { headers: headers })
          .map(res => res.json());
      console.log('out');
      return r;
  }

  verify(data) {
      console.log('in');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let r = this.http.post(this.urlSignin, JSON.stringify(data),
          { headers: headers })
          .map(res => res.json());
      console.log('out');
      return r;
  }

  
  create(data) {
    console.log('in');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let r = this.http.post(this.urlSignup, JSON.stringify(data),
          {headers: headers})
        .map(res => res.json());
    console.log('out');
    return r;



    //return this.http.post(this.url, JSON.stringify(data),
    //      {headers: headers})
    //    .map(res => res.json());
  }

  setLocation() {
      console.log('setting location');
      let u = this;

      //Asking for get current location and stroring it  in user service
      if (window && window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
              (position) => {
                  console.log('location', position);
                  if (position.coords) {
                      u.location = position.coords;
                      u.latitude = position.coords.latitude;
                      u.longitude = position.coords.longitude;
                      u.latitude = position.coords.latitude;
                      u.longitude = position.coords.longitude;
                 

                  }

              }
          )
      } // if

     // return r;



      //return this.http.post(this.url, JSON.stringify(data),
      //      {headers: headers})
      //    .map(res => res.json());
  }

  postData(url, data) {

      console.log('saving in post data', url,data);
      console.log('saving in post data', url);

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let r = this.http.post(url, JSON.stringify(data),
          { headers: headers })
          .map(res => res.json());
      console.log('out');
      return r;

  }
  updateProfile(data) {
      this.profile = data;
      return this.postData(this.urlUserProfile+ this.id,data);
  }

  order()
  {
      let data:any = {};
      data.items = this.cartItems;
      data.options = this.cartOptions;
      data.userId = this.id;
      data.email = this.email;

      console.log("order data", data);

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let r = this.http.post(this.urlOrder, JSON.stringify(data),
          { headers: headers })
          .map(res => res.json());
      console.log('out');
      return r;


  }

  
  addToCart(data) {
      this.cartItems.push(data);
      
      return this.postData(this.urlCart, data);

  }

  
}
