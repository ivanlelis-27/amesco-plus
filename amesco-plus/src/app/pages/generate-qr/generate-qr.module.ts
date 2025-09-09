import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenerateQr } from './generate-qr';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [GenerateQr],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class GenerateQrModule { }