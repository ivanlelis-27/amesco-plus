import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Login } from './login';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [Login],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class LoginModule { }