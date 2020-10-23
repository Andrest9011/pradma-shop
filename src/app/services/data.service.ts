import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendToken : string;
  private url: string;
  private http : HttpClient;

  constructor(  http: HttpClient) { 
    this.http = http;
    this.url = 'https://blitz-dev1.azurewebsites.net/ms-e-bill/api';

  }

  login(email: string, password: string){
      return new Promise ((resolve, reject) => {
        this.http.post('https://blitz-dev1.azurewebsites.net/ms-user/api/users/login', {Email: email, Password: password}, {headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-application-id': 'c14ba89d-4e8a-4ffc-be9c-77e9a207914b'
        })}).toPromise().then((token: string) => {
          this.backendToken = token;
          resolve(); 
        }).catch((error) => {
          // reject(error)
          alert('Credenciales incorrectas')
        });
      })
     
  }

  getProducts(){
    return new Promise ((resolve, reject) => {
      const headers = new HttpHeaders({
        'Authorization': this.backendToken
      });
       this.http.get(`${this.url}/product?page=1`, {headers})
        .toPromise().then(products => {
          console.log(products);
          resolve(products)}).catch((err) => {
          console.error(err);
          this.backendToken = undefined;
        });   
    })
  }

  getTaxes(){
    return new Promise ((resolve, reject) => {
      const headers = new HttpHeaders({
        'Authorization': this.backendToken
      });
      this.http.get(`${this.url}/taxes`, {headers})
        .toPromise().then(taxes => {
          console.log(taxes);
          resolve(taxes)
        }).catch((err) => {
          console.error (err);
          reject(err);
        })
    })
  }

  createProduct(code: number, name: string, urlImage: string, value: number, tax: []){
    return new Promise ((resolve, reject) => {
      this.http.post(`${this.url}/product`, {code, name, image: urlImage, value, tax},
      {headers: new HttpHeaders({
        'Authorization': this.backendToken
      })}).toPromise().then(created => {
        console.log(created);
        resolve();
      }).catch((err) => {
        console.error(err.error.message);
        reject(err);
      })
    })
  }

  get isLoggedIn(){
    return this.backendToken !== undefined;
  }

}
