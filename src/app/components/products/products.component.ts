import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  form: FormGroup;
  products = [];
  data: DataService;
  taxesOptions = [];
  taxesSelected = [];
  
  constructor( data : DataService, builder: FormBuilder) { 
    this.data = data;
    this.form = builder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      img: ['', Validators.required],
      unit: ['', Validators.required],
      iva: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.data.getProducts().then((resp: any) => {
      this.products = resp.results});
    this.data.getTaxes().then((taxes: any) => this.taxesOptions = taxes.results);
    
  } 

  createdProduct(){
    const code = this.form.get('code').value;
    const name = this.form.get('name').value;
    const img = this.form.get('img').value;
    const unit = this.form.get('unit').value;
    const iva = this.form.get('iva').value;
    this.data.createProduct(
      code, name, img, unit, iva
      ).then(() => {
        this.products.push({
          code,
          name,
          url_image: img,
          value: unit,
          tax: iva  
        });
        this.form.reset();
      });
  }
  
}



