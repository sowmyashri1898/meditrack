import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // myPriority = [
  //   { name: 'Medication', icon: 'medication', route: '/navbar/medication' },
  //   { name: 'Test Results', icon: 'science', route: '/navbar/labResults' },
  //   { name: 'Doctor Visit', icon: 'local_hospital', route: '/navbar/doctor-visit' },
  //   { name: 'Family Time', icon: 'family_restroom', route: '/guardian-main/family-visit' },
  //   { name: 'Physio', icon: 'fitness_center', route: '/navbar/physio' }
  // ];

  entertainment = [
        { name: 'Entertainment', icon: 'sports_esports', route: '/admin-main/admin-entertainment' },

    // { name: 'Games', icon: 'sports_esports', route: '/navbar/games' },
    // { name: 'Birthday Events', icon: 'cake', route: '/events' },
    // { name: 'Baking Sessions', icon: 'kitchen', route: '/baking-sessions' },
    // { name: 'Huddles & Parties', icon: 'group', route: '/parties' }
  ];

  generic = [
    { name: 'Housekeeping', icon: 'cleaning_services', route: '/admin-main/admin-housekeeping-repair' },
    // { name: 'Repair Work', icon: 'construction', route: '/navbar/repair-work' }
  ];


}
