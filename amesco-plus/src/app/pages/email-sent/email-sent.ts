import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-sent',
  standalone: false,
  templateUrl: './email-sent.html',
  styleUrl: './email-sent.scss'
})
export class EmailSent {
  email: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
