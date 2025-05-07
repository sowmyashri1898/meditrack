import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-med-record',
  standalone: true,
  imports: [RouterModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    CommonModule,
    CardModule,
    PanelModule,
    ReactiveFormsModule,
    DialogModule, FormsModule,
    CalendarModule, DropdownModule,TableModule],
  templateUrl: './med-record.component.html',
  styleUrl: './med-record.component.scss'
})
export class MedRecordComponent implements OnInit{
  records = [
    { id: 1, date: '2024-10-01', provider: 'Dr. Smith', condition: 'Hypertension', description: 'Routine checkup for blood pressure.' },
    { id: 2, date: '2024-09-15', provider: 'Dr. Johnson', condition: 'Diabetes', description: 'Follow-up on blood sugar levels.' },
    { id: 3, date: '2024-08-10', provider: 'Dr. Adams', condition: 'Asthma', description: 'Prescription for inhalers and breathing tests.' },
    // Add more records as needed
  ];

  filteredRecords: any[] = [];
  selectedRecord: any;
  displayDetailsDialog: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Initialize with all records
    this.filteredRecords = [...this.records];
  }

  searchRecords(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredRecords = this.records.filter(record =>
      record.provider.toLowerCase().includes(query) ||
      record.condition.toLowerCase().includes(query) ||
      record.date.includes(query)
    );
  }

  viewRecordDetails(record: any) {
    this.selectedRecord = record;
    this.displayDetailsDialog = true;
  }

  closeDetailsDialog() {
    this.displayDetailsDialog = false;
  }

  downloadRecord(recordId: number) {
    console.log('Downloading record:', recordId);
    // Implement download functionality here
  }
}
