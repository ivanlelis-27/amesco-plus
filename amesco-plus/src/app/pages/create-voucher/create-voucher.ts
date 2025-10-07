import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { validateVoucher } from '../../validations/voucher-validation';

@Component({
  selector: 'app-create-voucher',
  standalone: false,
  templateUrl: './create-voucher.html',
  styleUrl: './create-voucher.scss'
})
export class CreateVoucher implements OnInit {
  points: number | null = null;
  voucherNumber = '6343219875';
  voucherInput: string = '';
  validationMessage: string = '';
  vouchers = [
    { value: 200 },
    { value: 300 },
    { value: 500 }
  ];

  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.points = nav?.extras?.state?.['points'] ?? null;
    this.voucherNumber = this.generateRandomVoucherNumber();
    this.apiService.getCurrentUserDetails().subscribe({
      next: (details: any) => {
        this.points = details.points ?? 0;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      }
    });
  }

  onVoucherInputChange(value: string) {
    this.voucherInput = value;
    const inputAmount = Number(value);
    const msg = validateVoucher(this.points ?? 0, inputAmount);
    this.validationMessage = msg ?? '';
  }

  createVoucher() {
    const voucherId = Number(this.voucherNumber);
    const value = Number(this.voucherInput);
    this.apiService.createVoucher(voucherId, value).subscribe({
      next: (res) => {
        this.router.navigate(['/congratulations'], {
          state: {
            value: res.voucher?.Value ?? value,
            voucherCode: res.voucher?.VoucherCode ?? `AVQR${voucherId}`,
            qrImage: res.qrImage ? `data:image/png;base64,${res.qrImage}` : '/assets/qr-demo.png'
          }
        });
      },
      error: (err) => {
        this.validationMessage = err.error?.message || 'Failed to create voucher.';
        this.cdr.detectChanges();
      }
    });
  }


  generateRandomVoucherNumber(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  redeemVoucher(voucher: any) {
    this.voucherInput = voucher.value.toString();
    const msg = validateVoucher(this.points ?? 0, voucher.value);
    this.validationMessage = msg ?? '';
  }
}