import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-branches',
  standalone: false,
  templateUrl: './branches.html',
  styleUrls: ['./branches.scss']
})
export class Branches {
  showMapModal = false;
  selectedBranch: any = null;
  branches: any[] = [];


  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.apiService.getBranches().subscribe({
      next: (branches: any[]) => {
        this.branches = branches.map(b => ({
          branchName: b.branchName,
          address: b.address,
          contact: b.contact,
          hours: b.hours,
          lat: b.latitude,
          lng: b.longitude
        }));
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch branches:', err);
      }
    });
  }


  goBack() {
    this.router.navigate(['/dashboard']);
  }

  openMapModal(branch: any) {
    this.selectedBranch = branch;
    this.showMapModal = true;
  }

  closeMapModal() {
    this.showMapModal = false;
    this.selectedBranch = null;
  }
}