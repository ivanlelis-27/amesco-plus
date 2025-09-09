import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-generate-qr',
  standalone: false,
  templateUrl: './generate-qr.html',
  styleUrl: './generate-qr.scss'
})
export class GenerateQr {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
