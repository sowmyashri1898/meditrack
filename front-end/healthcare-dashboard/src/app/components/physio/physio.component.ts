import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-physio',
  standalone: true,
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './physio.component.html',
  styleUrl: './physio.component.scss'
})
export class PhysioComponent {
 physiotherapySessions = [
  { type: 'Knee Rehabilitation', date: new Date('2024-12-31T09:00:00'), time: new Date('2024-12-31T09:00:00') },
  { type: 'Back Therapy', date: new Date('2024-12-31T14:00:00'), time: new Date('2024-12-31T14:00:00') }
];

attendSession(session: any) {
  // Logic to mark attendance for physiotherapy
  console.log(`Attending session: ${session.type}`);
}
}