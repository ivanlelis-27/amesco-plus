import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-member-profile',
  imports: [IonicModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.scss'
})
export class MemberProfile {
  constructor(private router: Router) {}  

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
