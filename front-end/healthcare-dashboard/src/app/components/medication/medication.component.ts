import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [CommonModule,MatList,MatListItem],
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss'
})
export class MedicationComponent {
medications: any;

}
