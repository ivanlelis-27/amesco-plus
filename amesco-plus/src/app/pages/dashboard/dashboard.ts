import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
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
export class Dashboard implements OnInit, OnDestroy {
  carouselItems: any[] = [];
  currentSlide = 0;
  showMenu = false;
  closingMenu = false;
  autoScrollInterval: any;
  loadingPoints = false;

  faWallet = faWallet;
  points: number = 0;
  memberId: string = '';
  memberName: string = '';
  profileImage: string | null = null;

  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef) {
    const token = this.apiService.getToken();
    if (token) {
      const user: any = jwtDecode(token);
      this.memberId = user.memberId || '';
      this.memberName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

      this.apiService.getCurrentUserDetails().subscribe({
        next: (details: any) => {
          this.points = details.points ?? 0;

          this.memberId = details.memberId ?? this.memberId;
          this.memberName = details.name ?? this.memberName;


          if (details.profileImage) {
            const imgType = details.profileImageType ?? 'png';
            this.profileImage = `data:image/${imgType};base64,${details.profileImage}`;
          } else {
            this.profileImage = null;
          }

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
        }
      });
    }
  }

  ngOnInit() {
    // Fetch banners from backend
    this.apiService.getAdBanners().subscribe({
      next: (banners: any[]) => {
        // Convert image data to base64 URLs
        this.carouselItems = banners.map(b => ({
          src: `data:${b.contentType};base64,${b.imageData}`,
          alt: b.fileName
        }));
        this.cdr.detectChanges();
        this.startAutoScroll();
      },
      error: (err) => {
        console.error('Failed to fetch banners:', err);
        this.startAutoScroll(); // Start auto scroll even if no banners
      }
    });
  }

  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  openMenuModal() {
    this.showMenu = true;
  }

  startCloseMenu() {
    this.closingMenu = true;
  }

  animationDone(event: any) {
    if (event.toState === 'void') {
      this.showMenu = false;
      this.closingMenu = false;
    }
  }

  goToGenerateQr() {
    this.router.navigate(['/generate-qr']);
  }

  goToEarnedPoints() {
    this.router.navigate(['/earned-points']);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  goToCreateVoucher() {
    this.loadingPoints = true;
    this.apiService.getCurrentUserDetails().subscribe({
      next: (details: any) => {
        this.loadingPoints = false;
        this.router.navigate(['/create-voucher'], { state: { points: details.points ?? 0 } });
      },
      error: (err) => {
        this.loadingPoints = false;
        alert('Failed to load points.');
      }
    });
  }

  goToUnusedVouchers() {
    this.router.navigate(['/unused-vouchers']);
  }

  goToMemberProfile() {
    this.router.navigate(['/member-profile']);
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (this.currentSlide < this.carouselItems.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
      this.cdr.detectChanges();
    }, 10000);
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.carouselItems.length - 1) {
      this.currentSlide++;
    }
  }

  get trackTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

}
