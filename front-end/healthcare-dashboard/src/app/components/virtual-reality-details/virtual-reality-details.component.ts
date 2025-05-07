import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';
import { FormsModule } from '@angular/forms';
import { EventDTO } from '../../classes/event.model';
import { EventService } from '../../services/event.service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-virtual-reality-details',
  standalone:true,
  imports:[MatCard,MatCardHeader,MatCardTitle,MatCardContent,CommonModule],
  templateUrl: './virtual-reality-details.component.html',
  styleUrls: ['./virtual-reality-details.component.scss']
})
export class VirtualRealityDetailsComponent implements OnInit {
 events !:any[];
  constructor(private eventService:EventService){}
  ngOnInit(): void {
    this.loadEvents();
  }
  loadEvents() {
    this.eventService.getAllEventDTOs().subscribe(
      (response: EventDTO[]) => {
        this.events = response.filter(event => event.category === 'Virtual Reality');
      },
      (error: any) => console.error('Error loading events:', error)
    );
  }
  

  attendSession(session: any) {
    // Logic to mark attendance for physiotherapy
    console.log(`Attending session: ${session.type}`);
  }

}
