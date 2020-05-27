import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  register(form: NgForm) {
    console.log(form.controls['email'].value);
    console.log(form.controls['password'].value);
  }
  resetForm(form: NgForm) {
    form.resetForm();
  }
}
