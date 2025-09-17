import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Congratulations } from './congratulations';
import { DecimalPipe } from '@angular/common';

@NgModule({
    declarations: [Congratulations],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        DecimalPipe
    ]
})
export class CongratulationsModule { }