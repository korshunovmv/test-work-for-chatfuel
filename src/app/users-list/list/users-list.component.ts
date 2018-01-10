import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../model/user.model';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  options: FormGroup;

  public addUserForm: FormGroup;

  constructor(
    private userService: UserService, 
    fb: FormBuilder
  ) {
    this.addUserForm = new FormGroup({
      name: new FormControl(''),
    });
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.userService.users.subscribe((users: User[]) => {
      this.users = users;
    });
  }
  ngOnInit() {
  }
  generatGuid(): string {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  addNewUser() {
    let uuid = this.generatGuid();
    this.userService.addNewUser(<User>{
      id: uuid,
      name: this.addUserForm.controls.name.value, 
      avatarUrl: `https://robohash.org/${uuid}`}).subscribe(() => {
        this.addUserForm.reset();
      });
    // https://api.adorable.io/avatars/160/${uuid}
  }
}
