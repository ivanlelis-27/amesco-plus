import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faImage, faPen, faUser, faMobileAlt, faEnvelope, faClipboardList, faBookOpen, faFingerprint, faTimesCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';

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
    private apiService: ApiService
    , private sessionService: SessionService
  ) {
    this.apiService.getCurrentUserDetails().subscribe({
      next: (details: any) => {
        this.name = details.name || '';
        this.mobile = details.mobile || '';
        this.email = details.email || '';
        this.points = details.points ?? 0;

        if (details.profileImage) {
          const imgType = details.profileImageType ?? 'png';
          this.profileImage = `data:image/${imgType};base64,${details.profileImage}`;
        } else {
          this.profileImage = null;
        }

        this.cdr.detectChanges();
        console.log('User details:', details);
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      }
    });
  }
  isEditing = false;
  showLogoutConfirm = false;
  logoutLoading = false;
  name = '';
  mobile = '';
  email = '';
  points = 0;
  profileImage: string | null = null;
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
    // open the shared confirmation modal
    this.showLogoutConfirm = true;
  }

  hideLogoutConfirm() {
    this.showLogoutConfirm = false;
  }

  confirmLogout() {
    this.logoutLoading = true;
    this.apiService.logout().subscribe({
      next: () => {
        this.apiService.clearSession();
        this.sessionService.onUserLogout();
        this.logoutLoading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.apiService.clearSession();
        this.sessionService.onUserLogout();
        this.logoutLoading = false;
        this.router.navigate(['/login']);
      }
    });
  }

  onEdit() {
    this.isEditing = true;
  }

  onCancelEdit() {
    this.isEditing = false;
  }

  onSaveEdit() {
    // prepare DTO by splitting name into first and last
    const parts = (this.name || '').trim().split(/\s+/);
    const firstName = parts.length ? parts[0] : '';
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';

    const dto: any = {
      FirstName: firstName,
      LastName: lastName,
      Mobile: this.mobile
    };

    this.apiService.updateMe(dto).subscribe({
      next: (res) => {
        // Update local data from server response
        this.name = `${res.firstName || firstName}${res.lastName ? ' ' + res.lastName : ''}`.trim();
        this.mobile = res.mobile || this.mobile;
        this.isEditing = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to update profile', err);
        if (err && err.status === 401) {
          // session invalidated or unauthorized - clear session and send to welcome
          this.apiService.clearSession();
          window.location.replace('/welcome');
          return;
        }
        alert('Failed to save changes.');
      }
    });
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
      fetch(this.selectedImageUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'profile.png', { type: blob.type });
          this.apiService.uploadProfileImage(file).subscribe({
            next: () => {
              this.profileImage = this.selectedImageUrl; // Update immediately for UI
              this.showModal = false; // Always close modal after upload
              this.cdr.detectChanges();
            },
            error: () => {
              alert('Failed to upload image.');
              this.showModal = false;
              this.cdr.detectChanges();
            }
          });
        });
    } else {
      this.showModal = false;
      this.cdr.detectChanges();
    }
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
