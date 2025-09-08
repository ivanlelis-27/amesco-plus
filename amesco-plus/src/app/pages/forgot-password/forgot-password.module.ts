import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgotPassword } from './forgot-password';

@NgModule({
    declarations: [ForgotPassword],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ForgotPasswordModule { }