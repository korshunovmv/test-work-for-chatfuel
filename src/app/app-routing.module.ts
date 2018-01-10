import { NgModule }             from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';

import { UserService } from './core/user.service';

import { UsersListComponent }    from './users-list/list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/users-list', pathMatch: 'full' },
  { path: 'users-list', component: UsersListComponent },
  { path: 'user/:id', component: UserEditComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  baseTitle = 'My page';
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const title = event.url.split('/')[1];
          switch (title) {
            case 'users-list':
              this.title.setTitle(`${this.baseTitle} | Users list`);
              break;
            case 'user':
              let id = event.url.split('/')[2];
              let user = this.userService.getUserById(id);
              if (!user) {
                console.error(`User with id=${id} not found`);
                this.router.navigate(['/users-list']);
              } else {
                this.title.setTitle(`${this.baseTitle} | User - ${user.name}`);
              }
              break;
          }
        }
    });
  }
}
