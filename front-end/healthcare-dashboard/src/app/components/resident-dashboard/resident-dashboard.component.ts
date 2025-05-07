import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resident-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './resident-dashboard.component.html',
  styleUrls: ['./resident-dashboard.component.scss'],
})
export class ResidentDashboardComponent {
  myPriority = [
    { name: 'Medication', icon: 'medication', route: '/navbar/medication' },
    { name: 'Test Results', icon: 'science', route: '/navbar/labResults' },
    {
      name: 'Doctor Visit',
      icon: 'local_hospital',
      route: '/navbar/doctor-visit',
    },
    {
      name: 'Family Time',
      icon: 'family_restroom',
      route: '/navbar/family-time',
    },
    { name: 'Physio', icon: 'fitness_center', route: '/navbar/physio' },
  ];

  entertainment = [
    { name: 'Games', icon: 'sports_esports', route: '/navbar/games' },
    {
      name: 'Virtual Reality',
      icon: 'headset',
      route: '/navbar/virtual-reality-details',
    },
    { name: 'Movies', icon: 'movie', route: '/navbar/movies' },
    { name: 'Yoga', icon: 'self_improvement', route: '/navbar/yoga' },
    { name: 'Music', icon: 'music_note', route: '/navbar/music' },
  ];

  generic = [
    {
      name: 'Housekeeping',
      icon: 'cleaning_services',
      route: '/navbar/house-keeping',
    },
    { name: 'Repair Work', icon: 'construction', route: '/navbar/repair-work' },
  ];
}
