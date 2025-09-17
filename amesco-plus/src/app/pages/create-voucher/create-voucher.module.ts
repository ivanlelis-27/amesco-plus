import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateVoucher } from './create-voucher';

@NgModule({
    declarations: [CreateVoucher],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ]
})
export class CreateVoucherModule { }