import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-voucher',
  standalone: false,
  templateUrl: './create-voucher.html',
  styleUrl: './create-voucher.scss'
})
export class CreateVoucher {
  points = 260;
  voucherNumber = '6343219875';
  vouchers = [
    { value: 200 },
    { value: 300 },
    { value: 500 }
  ];

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  redeemVoucher(voucher: any) {
    // Add redeem logic here
    alert(`Redeemed voucher: ${voucher.value}`);
  }
}