import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenerateQr } from './generate-qr';

@NgModule({
    declarations: [GenerateQr],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ]
})
export class GenerateQrModule { }
