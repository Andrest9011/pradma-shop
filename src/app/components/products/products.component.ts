import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : any[] = [];

  constructor(private data : DataService) { 
    this.data.getProducts()
      .subscribe((data : any) => {
        console.log(data.results);
        this.products = data.results;
      });
  }

  ngOnInit(): void {
  }

}
