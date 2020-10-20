import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { 
    
  }

  getProducts(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsImFwcElkIjoiYzE0YmE4OWQtNGU4YS00ZmZjLWJlOWMtNzdlOWEyMDc5MTRiIiwiZXhwIjoxNjAzMjM0NzkwLCJpc3MiOiJCbGl0eiIsImF1ZCI6Ind3dy5CbGl0ei5jb20ifQ.coAzMNnDMyLN_Oj_dqVJ1IHaKoDQ51UFNZlR1tWo9NY'
    });
    return this.http.get('https://blitz-dev1.azurewebsites.net/ms-e-bill/api/product?page=1', {headers});
      
  }
}
