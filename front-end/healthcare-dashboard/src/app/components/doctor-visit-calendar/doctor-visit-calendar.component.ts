import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { DoctorVisit } from '../../classes/doctorvisit.model';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '../../classes/calenderOption.model';
import { DoctorVisitService } from '../../services/doctor-visit.service';

@Component({
  selector: 'app-doctor-visit-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './doctor-visit-calendar.component.html',
  styleUrl: './doctor-visit-calendar.component.scss'
})
export class DoctorVisitCalendarComponent {
  visits: DoctorVisit[] = [];
  calendarOptions: CalendarOptions =  {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2025-01-01' },
      { title: 'event 2', date: '2025-01-02' }
    ]
  };

  constructor(private doctorVisitService: DoctorVisitService) { }

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.doctorVisitService.getVisits(1).subscribe((data) => { // Assuming doctorId is 1
      this.visits = data;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.visits.map((visit) => ({
          title: `${visit.patientName} - ${visit.purpose}`,
          date: visit.visitDate,
        })),
      };
    });
  }
}
