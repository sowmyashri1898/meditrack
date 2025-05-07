import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { HousekeepingEventService } from '../../services/housekeeping-event.service';
import { HousekeepingEventDTO } from '../../classes/housekeepingEventDTO.model';

@Component({
  selector: 'app-house-keeping',
  standalone: true,
  providers:[DatePipe],
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardContent,CommonModule],
  templateUrl: './house-keeping.component.html',
  styleUrl: './house-keeping.component.scss'
})
export class HouseKeepingComponent {

events !:any[];
  constructor(private eventService:HousekeepingEventService){}
  ngOnInit(): void {
    this.loadEvents();
  }
  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (response: HousekeepingEventDTO[]) => {
        this.events = response;
      },
      (error: any) => console.error('Error loading events:', error)
    );
  }
  

  attendSession(session: any) {
    // Logic to mark attendance for physiotherapy
    console.log(`Attending session: ${session.type}`);
  }

}

