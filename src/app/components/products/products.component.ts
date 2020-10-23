import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
  pageActual = 1;
  
  constructor( data : DataService, builder: FormBuilder) { 
    this.data = data;
    this.form = builder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      img: ['', Validators.required],
      unit: ['', Validators.required],
      taxes: new FormArray([])
    });
  }

  private addCheckboxes() {
    this.taxesOptions.forEach(() => this.taxesFormArray.push(new FormControl(false)));
  }

  get taxesFormArray() {
    return this.form.controls.taxes as FormArray;
  }

  ngOnInit(): void {
    this.data.getProducts().then((resp: any) => {
      this.products = resp.results});
    this.data.getTaxes().then((taxes: any) => {
      this.taxesOptions = taxes.results;
      this.addCheckboxes();
    });
    
  } 

  createdProduct(){
    const code = this.form.get('code').value;
    const name = this.form.get('name').value;
    const img = this.form.get('img').value;
    const unit = this.form.get('unit').value;
    const taxesSelected = this.form.value.taxes
      .map((checked, index) => ({checked, index}))
      .filter((tax) => tax.checked)
      .map((tax) => this.taxesOptions[tax.index].id);
    this.data.createProduct(
      code, name, img, unit, taxesSelected
      ).then(() => {
        this.products.push({
          code,
          name,
          url_image: img,
          value: unit,
          tax: taxesSelected  
        });
        this.form.reset();
        alert('Producto creado');
      }).catch(err => {
        console.error(err);
        alert('El producto no pudo ser creado. Error = ' + err.error.message)
      });
  }
  
}



