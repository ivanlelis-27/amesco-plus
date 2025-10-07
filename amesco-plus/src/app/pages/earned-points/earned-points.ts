import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-earned-points',
  standalone: false,
  templateUrl: './earned-points.html',
  styleUrl: './earned-points.scss'
})
export class EarnedPoints implements OnInit, OnDestroy {
  transactions: any[] = [];
  userId: number | null = null;
  private sub!: Subscription;

  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const user = this.apiService.getUserFromToken();
    this.userId = Number(user?.sub);

    this.loadTransactions();

    // reload every time we come back to this route
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('earned-points')) {
        this.loadTransactions();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  private loadTransactions() {
    if (this.userId) {
      this.apiService.getUserTransactions(this.userId).subscribe({
        next: (allTransactions: any[]) => {
          this.transactions = allTransactions.filter(
            t => t.transaction.userId === this.userId
          );
          console.log('Grouped transactions:', this.transactions);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to fetch transactions: ', err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
