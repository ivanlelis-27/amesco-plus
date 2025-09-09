import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Notifications } from './notifications';


@NgModule({
    declarations: [Notifications],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class NotificationsModule {}