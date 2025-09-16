import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { branches } from '../../data/branches.data';


@Component({
  selector: 'app-branches',
  standalone: false,
  templateUrl: './branches.html',
  styleUrl: './branches.scss'
})
export class Branches {
  showMapModal = false;
  selectedBranch: any = null;
  branches = branches;


  constructor(private router: Router) { }

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