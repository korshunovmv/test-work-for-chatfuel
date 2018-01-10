import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../app/model/user.model';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AvatarComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  size = '60px';

  constructor(
    private el: ElementRef,
  ) {
  }

  ngOnInit() {
  }
  getUrl(): string {
    if (this.user) {
      return this.user.avatarUrl;
    }
    return undefined;
  }
}
