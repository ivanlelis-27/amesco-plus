import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: false,
  templateUrl: './terms.html',
  styleUrls: ['./terms.scss']
})
export class Terms {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/member-profile']);
  }

}
