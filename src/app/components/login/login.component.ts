import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor( builder: FormBuilder, private router: Router, private data: DataService) { 
    this.form = builder.group({
      email: ['diego.suarez@gmail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['diego', Validators.required]
    });
  }

  get emailInvalid (){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordInvalid (){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  login(){
    
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach (control => control.markAllAsTouched());
    };

    this.data.login(this.form.get('email').value, this.form.get('password').value).then(() => {
      this.router.navigate(['/products']);
    });


  }

}
