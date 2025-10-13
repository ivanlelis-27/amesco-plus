import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-announcement',
  standalone: false,
  templateUrl: './announcement.html',
  styleUrl: './announcement.scss'
})
export class Announcement implements OnInit {
  announcement: any = null;
  loading: boolean = true;
  promoProducts: any[] = [];
  promosLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getAnnouncementById(id).subscribe({
        next: (data) => {
          this.announcement = data;
          this.loading = false;
          // Fetch promo products
          this.apiService.getAnnouncementPromos(id).subscribe({
            next: (promos) => {
              this.promoProducts = promos || [];
              this.promosLoading = false;
              this.cdr.detectChanges();
            },
            error: () => {
              this.promoProducts = [];
              this.promosLoading = false;
              this.cdr.detectChanges();
            }
          });
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    window.history.length > 1 ? window.history.back() : location.href = '/dashboard';
  }
}
