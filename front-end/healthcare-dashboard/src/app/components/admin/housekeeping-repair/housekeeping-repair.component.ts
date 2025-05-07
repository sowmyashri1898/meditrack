import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { HousekeepingEventService } from '../../../services/housekeeping-event.service';
import { HousekeepingEventDTO } from '../../../classes/housekeepingEventDTO.model';

@Component({
  selector: 'app-housekeeping-repair',
  standalone: true,
  providers: [MessageService,DatePipe],
  imports: [
    CardModule,
    TableModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    CommonModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
  ],
  templateUrl: './housekeeping-repair.component.html',
  styleUrls: ['./housekeeping-repair.component.scss'],
})
export class HousekeepingRepairComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = [];
  isDialogVisible: boolean = false;
  selectedEventId: number | null = null;

  serviceTypes = [
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Maintenance', value: 'Maintenance' },
    { label: 'Sanitization', value: 'Sanitization' },
  ];

  frequencies = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
  ];

  priorities = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private housekeepingService: HousekeepingEventService // Inject service
  ) {
    this.taskForm = this.fb.group({
      id: [null], // For edit scenarios
      serviceType: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      frequency: ['', Validators.required],
      residentRoomDetails: [''],
      commonArea: [''],
      specialRequests: [''],
      priorityLevel: ['', Validators.required],
      supervisor: [''],
      checklist: [''],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Fetch tasks from the backend.
   */
  loadTasks() {
    this.housekeepingService.getAllEvents().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tasks' });
      },
    });
  }

  openDialog(eventId?: number) {
    if (eventId) {
      this.viewEventDetails(eventId);
    } else {
      this.isDialogVisible = true;
      this.taskForm.reset();
      this.selectedEventId = null;
    }
  }
 
  viewEventDetails(eventId: number) {
    this.housekeepingService.getEventDTOById(eventId).subscribe(
      (response: HousekeepingEventDTO) => {
        this.selectedEventId = eventId;
  
        const startTime = response.startTime ? new Date(response.startTime) : null;
        const endTime = response.endTime ? new Date(response.endTime) : null;
  
        this.taskForm.patchValue({
          ...response,
          startTime,
          endTime,
        });
  
        this.isDialogVisible = true;
      },
      // (error) => console.error('Error fetching event details:', error)
    );
  }
  closeDialog() {
    this.isDialogVisible = false;
  }

  /**
   * Add or update a task.
   */
  saveTask() {
    if (this.taskForm.valid) {
      const task = { ...this.taskForm.value };

      if (task.id) {
        // Update existing task
        this.housekeepingService.updateEvent(task.id, task).subscribe({
          next: () => {
            this.loadTasks();
            this.isDialogVisible = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
          },
          error: (err) => {
            console.error('Error updating task:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task' });
          },
        });
      } else {
        // Create new task
        this.housekeepingService.createEvent(task).subscribe({
          next: () => {
            this.loadTasks();
            this.isDialogVisible = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created successfully' });
          },
          error: (err) => {
            console.error('Error creating task:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create task' });
          },
        });
      }
    } else {
      console.log('Form is invalid');
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields' });
    }
  }

  /**
   * Edit a task.
   */
  editTask(task: any) {
    this.openDialog();
    this.taskForm.patchValue(task);
  }

  /**
   * Delete a task.
   */
  deleteTask(task: any) {
    if (task.id) {
      this.housekeepingService.deleteEvent(task.id).subscribe({
        next: () => {
          this.loadTasks();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task deleted successfully' });
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete task' });
        },
      });
    }
  }
}
