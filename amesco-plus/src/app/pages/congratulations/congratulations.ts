import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-congratulations',
  standalone: false,
  templateUrl: './congratulations.html',
  styleUrl: './congratulations.scss'
})
export class Congratulations {
  value: number = 0;
  voucherCode: string = '';
  qrImage: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.value = nav?.extras?.state?.['value'] ?? 0;
    this.voucherCode = nav?.extras?.state?.['voucherCode'] ?? '';
    this.qrImage = nav?.extras?.state?.['qrImage'] ?? '';
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}