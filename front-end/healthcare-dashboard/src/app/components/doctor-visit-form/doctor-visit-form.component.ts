import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { DoctorVisit } from '../../classes/doctorvisit.model';
import { DoctorVisitService } from '../../services/doctor-visit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-visit-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-visit-form.component.html',
  styleUrl: './doctor-visit-form.component.scss'
})
export class DoctorVisitFormComponent {
  newVisit: DoctorVisit = new DoctorVisit();

  constructor(private doctorVisitService: DoctorVisitService) {}

  addVisit(): void {
    this.doctorVisitService.createVisit(this.newVisit).subscribe(() => {
      alert('Visit added successfully');
      this.newVisit = new DoctorVisit(); // Reset the form
    });
  }
}
