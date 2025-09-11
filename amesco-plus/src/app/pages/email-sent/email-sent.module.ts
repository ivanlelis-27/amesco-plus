import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailSent } from './email-sent';

@NgModule({
    declarations: [EmailSent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class EmailSentModule { }