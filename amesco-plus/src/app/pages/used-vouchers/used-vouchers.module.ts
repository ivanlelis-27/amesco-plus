import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsedVouchers } from './used-vouchers';

@NgModule({
    declarations: [UsedVouchers],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class UsedVouchersModule { }