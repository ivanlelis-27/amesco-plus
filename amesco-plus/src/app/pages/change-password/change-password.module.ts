import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangePassword } from './change-password';

@NgModule({
    declarations: [ChangePassword],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class ChangePasswordModule { }