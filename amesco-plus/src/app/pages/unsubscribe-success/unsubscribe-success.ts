import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsubscribe-success',
  templateUrl: './unsubscribe-success.html',
  styleUrl: './unsubscribe-success.scss'
})
export class UnsubscribeSuccess {
  constructor(private router: Router) { }

  onOk() {
    this.router.navigate(['/welcome']); // Redirect to welcome page
  }
}