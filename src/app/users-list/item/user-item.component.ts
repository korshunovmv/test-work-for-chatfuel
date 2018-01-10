import { Component, OnInit, Input, Output, HostListener, EventEmitter, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/user.model';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserItemComponent implements OnInit {
  @Input()
  user: User;

  @HostListener('click')
  onClick() {
    this.router.navigate(['/user', this.user.id]);
  }

  constructor(private router: Router) {}

  ngOnInit() {
  }
}
