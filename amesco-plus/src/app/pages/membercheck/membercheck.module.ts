import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Membercheck } from './membercheck';

@NgModule({
    declarations: [Membercheck],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class MembercheckModule { }