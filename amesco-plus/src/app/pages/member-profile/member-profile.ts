import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faImage, faPen, faUser, faMobileAlt, faEnvelope, faClipboardList, faBookOpen, faFingerprint, faTimesCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-profile',
  standalone: false,
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MemberProfile {
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService // <-- Inject AuthService
  ) {
    const user = this.authService.getUserFromToken();
    if (user) {
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.mobile = user.mobile || '';
      this.email = user.email || '';
      this.points = user.points || 0;
    }
  }
  isEditing = false;
  firstName = '';
  lastName = '';
  mobile = '';
  email = '';
  points = 0;
  faImage = faImage;
  faPen = faPen;
  faUser = faUser;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faClipboardList = faClipboardList;
  faBookOpen = faBookOpen;
  faFingerprint = faFingerprint;
  faTimesCircle = faTimesCircle;
  faTimes = faTimes;
  faCheck = faCheck;

  goBack() {
    this.router.navigate(['/dashboard']);
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

  onLogout() {
  }

  onEdit() {
    this.isEditing = true;
  }

  onCancelEdit() {
    this.isEditing = false;
  }

  onSaveEdit() {
    this.isEditing = false;
  }

  showModal = false;
  selectedImageUrl: string | null = null;
  profileImageUrl: string | null = null;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateProfile() {
    if (this.selectedImageUrl) {
      this.profileImageUrl = this.selectedImageUrl;
    }
    this.showModal = false;
  }

  openImagePicker() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImageUrl = e.target.result;
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
}
