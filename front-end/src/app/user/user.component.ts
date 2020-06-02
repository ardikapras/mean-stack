import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  selectedUser: User;
  inputUser: User;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'address', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  inputUserForm;
  btnDeleteDisable = true;
  dataSource;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.inputUserForm = this.formBuilder.group({
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      address: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getUsers();
    this.dataSource.paginator = this.paginator;
  }
  save(form: NgForm) {
    if (form.controls['id'].value) {
      console.log('present')
    } else {
      console.log('nothing')
    }
  }
  delete(form: NgForm) {
    console.log(form.controls['id'].value);
  }
  reset() {
    this.inputUserForm.reset();
    this.btnDeleteDisable = true;
  }
  getUsers(): void {
    this.userService.getUsers().subscribe((dataUser: {}) => {
      this.dataSource.data = dataUser;
      return dataUser;
    });
  }

  onSelect(user: User) {
    this.inputUserForm.controls['id'].setValue(user.id);
    this.inputUserForm.controls['firstname'].setValue(user.firstname);
    this.inputUserForm.controls['lastname'].setValue(user.lastname);
    this.inputUserForm.controls['email'].setValue(user.email);
    this.inputUserForm.controls['address'].setValue(user.address);
    if (user.id != '') {
      this.btnDeleteDisable = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}