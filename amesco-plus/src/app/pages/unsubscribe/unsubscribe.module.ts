import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Unsubscribe } from './unsubscribe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [Unsubscribe],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FontAwesomeModule
    ],
    exports: [Unsubscribe]
})
export class UnsubscribeModule { }