import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unused-vouchers',
  standalone: false,
  templateUrl: './unused-vouchers.html',
  styleUrl: './unused-vouchers.scss'
})
export class UnusedVouchers implements OnInit {
  vouchers: any[] = [];
  memberId: string | null = null;
  modalOpen = false;
  modalClosing = false;
  selectedVoucher: any = null;

  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const user = this.apiService.getUserFromToken();
    this.memberId = user?.memberId || null;
    if (this.memberId) {
      this.apiService.getUserVouchers(this.memberId).subscribe({
        next: (vouchers: any[]) => {
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
    this.apiService.deleteVoucher(this.selectedVoucher.voucherCode).subscribe({
      next: (res) => {
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