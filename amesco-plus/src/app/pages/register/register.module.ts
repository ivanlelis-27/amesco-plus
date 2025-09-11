import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Register } from './register';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [Register],
    imports: [
        CommonModule,
        FormsModule 
    ]
})
export class RegisterModule {}