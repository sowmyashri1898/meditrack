import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-repair-work',
  standalone: true,
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardSubtitle,MatCardContent,CommonModule],
  templateUrl: './repair-work.component.html',
  styleUrl: './repair-work.component.scss'
})
export class RepairWorkComponent {
  repairs = [
    { name: 'Leaky Tap', type: 'Plumbing', assignedTo: 'John', status: 'In Progress' },
    { name: 'Broken Door Handle', type: 'Carpentry', assignedTo: 'Steve', status: 'Completed' },
    { name: 'Room Painting', type: 'Painting', assignedTo: 'Alex', status: 'Pending' }
  ];

  trackRepair(repair: any) {
    // Logic to track repair progress
    console.log(`Tracking progress of: ${repair.name}`);
  }

}
