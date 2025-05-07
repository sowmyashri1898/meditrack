import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guardian-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './guardian-dashboard.component.html',
  styleUrl: './guardian-dashboard.component.scss'
})
export class GuardianDashboardComponent {

  myPriority = [
    { name: 'Medication', icon: 'medication', route: '/navbar/medication' },
    { name: 'Test Results', icon: 'science', route: '/navbar/labResults' },
    { name: 'Doctor Visit', icon: 'local_hospital', route: '/navbar/doctor-visit' },
    { name: 'Family Time', icon: 'family_restroom', route: '/guardian-main/family-visit' },
    { name: 'Physio', icon: 'fitness_center', route: '/navbar/physio' }
  ];

  entertainment = [
    { name: 'Games', icon: 'sports_esports', route: '/navbar/games' },
    { name: 'Birthday Events', icon: 'cake', route: '/events' },
    { name: 'Baking Sessions', icon: 'kitchen', route: '/baking-sessions' },
    { name: 'Huddles & Parties', icon: 'group', route: '/parties' }
  ];

  generic = [
    { name: 'Housekeeping', icon: 'cleaning_services', route: '/housekeeping' },
    { name: 'Repair Work', icon: 'construction', route: '/navbar/repair-work' }
  ];

}
