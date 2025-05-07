import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { DropdownModule } from 'primeng/dropdown';
import { FamilyVisit } from '../../classes/familyVisit.model';
import { FamilyVisitService } from '../../services/family-visit.service';
import { SignupService } from '../../services/signup.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-family-time',
  standalone: true,
  providers:[DatePipe],
  imports: [CommonModule,DropdownModule,TableModule],
  templateUrl: './family-time.component.html',
  styleUrl: './family-time.component.scss'
})
export class FamilyTimeComponent implements OnInit{
  visits: FamilyVisit[] = [];
  isLoading = true;
  errorMessage = '';
  token!: string;

  constructor(
    private familyVisitService: FamilyVisitService,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    this.loadVisits();
  }

  loadVisits(): void {
    if (this.token) {
      this.familyVisitService?.getVisitsForPatient(this.token).subscribe({
        next: (data) => {
          this.visits = data;
          console.log('Visits:', this.visits);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching visits:', error);
          this.errorMessage = 'Failed to load visits. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  }
}
