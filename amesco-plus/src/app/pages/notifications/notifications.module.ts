import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Notifications } from './notifications';
import { FilterScheduledBeforeTodayPipe } from '../../pipes/notification-pipe';

@NgModule({
    declarations: [Notifications, FilterScheduledBeforeTodayPipe],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class NotificationsModule {}