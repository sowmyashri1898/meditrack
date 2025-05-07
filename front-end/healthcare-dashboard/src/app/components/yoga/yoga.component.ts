import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { EventDTO } from '../../classes/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardContent,CommonModule],
  templateUrl: './yoga.component.html',
  styleUrl: './yoga.component.scss'
})
export class YogaComponent implements OnInit{
  events !:any[];
  constructor(private eventService:EventService){}
  ngOnInit(): void {
    this.loadEvents();
  }
  loadEvents() {
    this.eventService.getAllEventDTOs().subscribe(
      (response: EventDTO[]) => {
        this.events = response.filter(event => event.category === 'Wellness and Yoga');
      },
      (error: any) => console.error('Error loading events:', error)
    );
  }
  

  attendSession(session: any) {
    // Logic to mark attendance for physiotherapy
    console.log(`Attending session: ${session.type}`);
  }

}

