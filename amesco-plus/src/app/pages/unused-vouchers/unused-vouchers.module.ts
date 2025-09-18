import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UnusedVouchers } from './unused-vouchers';

@NgModule({
    declarations: [UnusedVouchers],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class UnusedVouchersModule { }