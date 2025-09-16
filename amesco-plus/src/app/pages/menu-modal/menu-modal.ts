import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faStore, faClipboardList, faBookOpen, faFingerprint, faEnvelope, faTimesCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-menu-modal',
  standalone: false,
  templateUrl: './menu-modal.html',
  styleUrl: './menu-modal.scss',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('350ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('350ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MenuModal {
  constructor(private router: Router) { }
  @Input() closingMenu = false;
  @Output() animationDone = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  faStore = faStore;
  faClipboardList = faClipboardList;
  faBookOpen = faBookOpen;
  faFingerprint = faFingerprint;
  faEnvelope = faEnvelope;
  faTimesCircle = faTimesCircle;
  faSignOutAlt = faSignOutAlt;

  closeMenu() {
    this.close.emit();
  }

  onAnimationDone(event: any) {
    this.animationDone.emit(event);
  }

  goToBranches() {
    this.router.navigate(['/branches']);
  }

  goToFaqs() {
    this.router.navigate(['/faqs']);
  }

  goToTerms() {
    this.router.navigate(['/terms']);
  }

  goToPrivacy() {
    this.router.navigate(['/privacy']);
  }

  goToUnsubscribe() {
    this.router.navigate(['/unsubscribe']);
  }


}
