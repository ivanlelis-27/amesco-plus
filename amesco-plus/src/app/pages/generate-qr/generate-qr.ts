import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-generate-qr',
  standalone: false,
  templateUrl: './generate-qr.html',
  styleUrls: ['./generate-qr.scss'],
})
export class GenerateQr implements OnInit {
  qrImage: string | null = null;
  memberId: string = '';
  email: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.getUserQr().subscribe({
      next: (res: Blob) => {
        const reader = new FileReader();
        reader.onload = () => this.qrImage = reader.result as string;
        reader.readAsDataURL(res);
      },
      error: (err) => console.error(err)
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
