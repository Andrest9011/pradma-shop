import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private builder: FormBuilder, private router: Router) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  get emailInvalid (){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordInvalid (){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  createForm () {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }

  login(){
    console.log(this.form);
    
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach (control => control.markAllAsTouched());
    };

    this.router.navigate(['/products']);

  }

}
