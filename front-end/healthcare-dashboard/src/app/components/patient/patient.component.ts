import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [FormsModule,CommonModule],
  providers:[FilterService],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
searchQuery: any;
patients: any;
viewPatientDetails(arg0: any) {
throw new Error('Method not implemented.');
}

}
