import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-httpclient',
  templateUrl: './httpclient.component.html',
  styleUrls: ['./httpclient.component.scss']
})
export class HttpclientComponent {
  apiRoot = 'http://httpbin.org';

  constructor(private httpClient: HttpClient) {}

  doGET() {
    const url = `${this.apiRoot}/get`;
    const params = new HttpParams()
      .set('_page', '1')
      .set('_limit', '10');

    this.httpClient.get(url, {params})
      .subscribe(
        data => {
          console.log(data);
          document.getElementById('result').innerHTML = JSON.stringify(data);
        },
        error => {
          console.log('Error: ' + error);
        }
      );
    document.getElementById('method_type').innerHTML = '[ GET Method ]';
  }

  doPOST() {
    const url = `${this.apiRoot}/post`;
    const json = [
      {
        name: 'Lexxi Whitehill',
        email: 'lexxiwhitehill@gmail.com',
        address: 'India'
      },
      {
        name: 'Belladonna Madden',
        email: 'belladonnamadden@gmail.com',
        address: 'USA'
      },
      {
        name: 'Caylen Puckett',
        email: 'caylenpuckett@gmail.com',
        address: 'UK'
      }
    ];

    this.httpClient.post(url, {json}).subscribe(
      data => {
        console.log(data);
        document.getElementById('result').innerHTML = JSON.stringify(data);
      },
      error => {
        console.log('Error: ' + error);
      }
    );
    document.getElementById('method_type').innerHTML = '[ POST Method ]';
  }

  doPUT() {
    const url = `${this.apiRoot}/put`;
    const json = [{
        name: 'Belladonna Madden',
        email: 'belladonnamadden@gmail.com',
        address: 'USA'
      }];

    this.httpClient.put(url, { json }).subscribe(
      data => {
        console.log(data);
        document.getElementById('result').innerHTML = JSON.stringify(data);
      },
      error => {
        console.log('Error: ' + error);
      }
    );
    document.getElementById('method_type').innerHTML = '[ PUT Method ]';
  }

  doDELETE() {
    const url = `${this.apiRoot}/delete`;
    const params = new HttpParams()
      .set('employee_id', '101');

    this.httpClient.delete(url, {params})
        .subscribe(
          data => {
            console.log(data);
            document.getElementById('result').innerHTML = JSON.stringify(data);
          },
          error => {
            console.log('Error: ', error);
          }
        );
    document.getElementById('method_type').innerHTML = '[ DELETE Method ]';
  }

  doGETAsPromise() {
    console.log('GET as Promise');
    const url = `${this.apiRoot}/get`;
    this.httpClient.get(url)
      .toPromise()
      .then(
        data => {
           console.log(data);
           document.getElementById('result').innerHTML = JSON.stringify(data);
        },
        error => {
          console.log(error);
        }
      );
    document.getElementById('method_type').innerHTML = '[ GET as Promise ]';
  }

  doGETAsPromiseError() {
    const url = `${this.apiRoot}/post`;
    this.httpClient.get(url)
      .toPromise()
      .then(
        data => {
          console.log(data);
          document.getElementById('result').innerHTML = JSON.stringify(data);
        },
        error => {
          console.log('Error: ' + JSON.stringify(error));
          document.getElementById('result').innerHTML = JSON.stringify(error);
        }
      );
      document.getElementById('method_type').innerHTML = '[ GET as Promise Error ]';
  }

  doGETAsObservableError() {
    console.log('GET As Observable Error');
    const url = `${this.apiRoot}/post`;
    this.httpClient.get(url).subscribe(
      data => {
        console.log(data);
      },
      error => {
         console.error(`Error: ${error.status} ${error.statusText}`);
         document.getElementById('result').innerHTML = JSON.stringify(error);
      }
    );
    document.getElementById('method_type').innerHTML = '[ GET as Observable Error ]';
  }

  doGETWithHeaders() {
    console.log('GET With Headers');
    const headers = new HttpHeaders()
        .set('Authorization', 'username:password');

    const url = `${this.apiRoot}/get`;
    this.httpClient.get(url, { headers }).subscribe(
      data => {
        console.log(data);
        document.getElementById('result').innerHTML = JSON.stringify(data);
      },
      error => {
        console.error(`Error: ${error.status} ${error.statusText}`);
      }
    );
    document.getElementById('method_type').innerHTML = '[ GET With Headers ]';
  }
}
