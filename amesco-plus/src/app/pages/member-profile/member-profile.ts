import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faImage, faPen, faUser, faMobileAlt, faEnvelope, faClipboardList, faBookOpen, faFingerprint, faTimesCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-member-profile',
  standalone: false,
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.scss'
})
export class MemberProfile {
  constructor(private router: Router, private cdr: ChangeDetectorRef) { }
  isEditing = false;
  firstName = 'Juan';
  lastName = 'Dela Cruz';
  mobile = '9123456789';
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
