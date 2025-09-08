import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Register } from './register';

@NgModule({
    declarations: [Register],
    imports: [
        CommonModule,
        FormsModule // <-- Add this line
    ]
})
export class RegisterModule {}