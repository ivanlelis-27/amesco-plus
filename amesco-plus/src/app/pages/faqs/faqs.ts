import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  standalone: false,
  templateUrl: './faqs.html',
  styleUrl: './faqs.scss'
})
export class Faqs {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/member-profile']);
  }

}
