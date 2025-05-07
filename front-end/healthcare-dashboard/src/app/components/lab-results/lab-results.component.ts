import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lab-results',
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
    CalendarModule, DropdownModule,
    TableModule],
  templateUrl: './lab-results.component.html',
  styleUrl: './lab-results.component.scss'
})
export class LabResultsComponent implements OnInit {

providers: any[]|undefined;

 
  displayTestDialog: boolean = false;  
  displayFilterDialog: boolean = false; 
  selectedTest: any; 
  labResults: any[] = [];  
  filterStartDate: Date | null = null;  
  filterEndDate: Date | null = null;
  scheduleForm!: FormGroup<any>;
  minDate: Date|null|undefined;
  displayScheduleDialog: boolean = false;

  labResultsData = [
    { testName: 'Blood Test', testDate: new Date('2023-10-01'), status: 'Completed', findings: 'No issues found', notes: 'Normal levels.', testId: 1 },
    { testName: 'X-ray', testDate: new Date('2023-10-03'), status: 'Completed', findings: 'Fracture detected', notes: 'Slight fracture in left arm', testId: 2 },
    { testName: 'Blood Test', testDate: new Date('2023-09-15'), status: 'Completed', findings: 'High cholesterol', notes: 'Needs attention', testId: 3 },
    { testName: 'MRI Scan', testDate: new Date('2023-10-05'), status: 'Pending', findings: '', notes: '', testId: 4 },
  ];
constructor(public formBuilder: FormBuilder,   public router:Router){}
  ngOnInit(): void {
    this.filterStartDate = this.filterStartDate ?? new Date(); 
    this.filterEndDate = this.filterEndDate ?? new Date();
    this.labResults = [
      { testName: 'Blood Test', testDate: new Date('2023-10-01'), status: 'Completed', findings: 'No issues found', notes: 'Normal levels.' },
      { testName: 'X-ray', testDate: new Date('2023-10-03'), status: 'Completed', findings: 'Fracture detected', notes: 'Slight fracture in left arm' },
    ];
    this.labResults = this.labResultsData;
    this.scheduleForm = this.formBuilder.group({
      date: [null, Validators.required],
      time: ['', Validators.required],
      provider: [null, Validators.required]
    })
  }

  viewTestDetails(test: any): void {
    this.selectedTest = test;
    this.displayTestDialog = true;
  }

  closeTestDialog(): void {
    this.displayTestDialog = false;
    this.selectedTest = null;  
  }

  downloadResult(): void {
    console.log('Downloading result for:', this.selectedTest.testName);
    // Here you can implement logic to download the result (PDF, image, etc.)
  }

  showFilterDialog(): void {
    this.displayFilterDialog = true;
  }

 
  clearFilter(): void {
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.labResults = this.labResultsData;  
    this.displayFilterDialog = false;
  }
  applyFilter(): void {
    if (this.filterStartDate && this.filterEndDate) {
      this.labResults = this.labResultsData.filter(result => {
        // return result.testDate >= this.filterStartDate && result.testDate <= this.filterEndDate;
      });
    } else {
      console.warn('Please select both start and end dates to apply the filter.');
    }
  
    this.displayFilterDialog = false;  
  }
  onBook() {
    this.displayScheduleDialog = true}
    clear() {
      this.scheduleForm.reset();
      }
      submitSchedule() {
      }
     
      onHideAppointment() {
      }
}
