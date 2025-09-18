import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unused-vouchers',
  standalone: false,
  templateUrl: './unused-vouchers.html',
  styleUrl: './unused-vouchers.scss'
})
export class UnusedVouchers implements OnInit {
  vouchers: any[] = [];
  userId: number | null = null;
  modalOpen = false;
  modalClosing = false;
  selectedVoucher: any = null;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userId = Number(user?.sub);
    if (this.userId) {
      this.authService.getUserVouchers(this.userId).subscribe({
        next: (vouchers: any[]) => {
          // Only show vouchers where isUsed is false
          this.vouchers = vouchers.filter(v => v.isUsed === false);
          console.log('Unused vouchers to display:', this.vouchers);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch vouchers:', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  goToUsedVouchers() {
    this.router.navigate(['/used-vouchers']);
  }

  openDeleteModal(voucher: any) {
    this.selectedVoucher = voucher;
    this.modalOpen = true;
    this.modalClosing = false;
  }

  closeModal() {
    this.modalClosing = true;
    setTimeout(() => {
      this.modalOpen = false;
      this.selectedVoucher = null;
      this.modalClosing = false;
      this.cdr.detectChanges();
    }, 350);
  }

  confirmDelete() {
    if (!this.selectedVoucher?.voucherCode) return;
    this.authService.deleteVoucher(this.selectedVoucher.voucherCode).subscribe({
      next: (res) => {
        // Remove the deleted voucher from the array
        this.vouchers = this.vouchers.filter(
          v => v.voucherCode !== this.selectedVoucher.voucherCode
        );
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to delete voucher:', err);
        this.closeModal();
      }
    });
  }
}