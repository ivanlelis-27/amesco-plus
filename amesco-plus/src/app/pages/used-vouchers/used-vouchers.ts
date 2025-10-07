import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-used-vouchers',
  standalone: false,
  templateUrl: './used-vouchers.html',
  styleUrl: './used-vouchers.scss'
})
export class UsedVouchers implements OnInit {
  vouchers: any[] = [];
  userId: number | null = null;

  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const user = this.apiService.getUserFromToken();
    this.userId = Number(user?.sub);
    if (this.userId) {
      this.apiService.getUserVouchers(this.userId).subscribe({
        next: (vouchers: any[]) => {
          this.vouchers = vouchers.filter(v => v.isUsed === true);
          console.log('Used vouchers to display:', this.vouchers);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch vouchers:', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/unused-vouchers']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
