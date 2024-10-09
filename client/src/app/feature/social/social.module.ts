import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SocialRoutingModule } from './social.routes';
import { SendEmailComponent } from './pages/send-email/send-email.component';

@NgModule({
  declarations: [
    SendEmailComponent
  ],
  imports: [
    CommonModule, SharedModule, SocialRoutingModule,
  ],
})
export class SocialModule { }
