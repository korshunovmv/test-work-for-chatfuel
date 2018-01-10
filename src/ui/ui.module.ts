import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],

  declarations: [
    AvatarComponent,
  ],
  exports: [
    AvatarComponent,
  ],
})
export class UiModule { }
