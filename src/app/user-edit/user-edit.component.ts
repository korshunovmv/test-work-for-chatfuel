import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../core/user.service';

import { User } from '../model/user.model';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input()
  set user(value: User) {
    this._user = value;
    if (value) {
      this.originalUser = JSON.parse(JSON.stringify(value));
    } else {
      this.originalUser = null;
    }
    this.updateUserForm();
  }
  get user(): User {
    return this._user;
  }
  _user: User;

  originalUser: User;
  options: FormGroup;
  userUpdated: boolean;

  public userForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService, 
    fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((data: any) => {
      if (data['id']) {
        this.user = this.userService.getUserById(data['id']);
      }
    });
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngOnInit() {
  }
  backToList() {
    this.router.navigate(['/users-list']);
  }
  updateUserForm()  {
    this.userForm = new FormGroup({
      name: new FormControl((this.user) ? this.user.name : '', [Validators.required])
    });
    this.userForm.valueChanges.subscribe((data) => {
      this.userUpdated = false;
      for (let key in data) {
        if (data.hasOwnProperty(key) && JSON.stringify(data[key]) !== JSON.stringify(this.originalUser[key])) {
          this.userUpdated = true;  
          break;
        }
      }
    });
  }
  updateUser() {
    const oldName = this.user.name;
    this.user.name = this.userForm.controls.name.value;
    this.userService.updateUser(this.user).subscribe(() => {
      this.originalUser = JSON.parse(JSON.stringify(this.user));
      this.userUpdated = false;
    }, () => {
      console.error('Error in save user');
      this.user.name = oldName;
    });
  }
  getErrorMessage() {
    return this.userForm.controls.name.hasError('required') ? 'You must enter a value' : '';
  }
}
