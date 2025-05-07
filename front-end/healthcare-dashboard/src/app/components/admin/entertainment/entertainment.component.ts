import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
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
import { EventService } from '../../../services/event.service';
import { EventDTO } from '../../../classes/event.model';
import { CheckboxModule } from 'primeng/checkbox';
import { InputText, InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-entertainment',
  standalone: true,
  providers: [DatePipe, MessageService],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss'],
})
export class EntertainmentComponent {
  isDialogVisible = false;
  eventForm: FormGroup;
  events: any[] = [];
  selectedEventId: number | null = null;

  // Dropdown options
  accessOptions = [
    { label: 'Resident-only', value: 'Resident-only' },
    { label: 'Guardian-only', value: 'Guardian-only' },
    { label: 'Both Residents and Guardians', value: 'Both' },
  ];
  categories = [
    { label: 'Virtual Reality', value: 'Virtual Reality' },
    { label: 'Movies', value: 'Movies' },
    { label: 'Games', value: 'Games' },
    { label: 'Music and Dance', value: 'Music and Dance' },
    { label: 'Wellness and Yoga', value: 'Wellness and Yoga' },
  ];
  notifications = [
    { label: 'Email', value: 'Email' },
    { label: 'Push Notification', value: 'Push Notification' },
    { label: 'SMS', value: 'SMS' },
  ];
  tags = [
    { label: 'Music', value: 'Music' },
    { label: 'Wellness', value: 'Wellness' },
    { label: 'Games', value: 'Games' },
    { label: 'Art', value: 'Art' },
  ];
patientOptions: any[]|undefined;
guardianOptions: any[]|undefined;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      eventName: [null, Validators.required],
      description: ['', Validators.required],
      tags: [[]],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      category: ['', Validators.required],
      accessOptions: [null],
      notificationPreferences: [[]],
      rsvpRequired: [false],
      participantLimit: [null],
      patientIds: [[]], // IDs of patients participating
      guardianIds: [[]], // IDs of guardians participating
    });

    this.loadEvents();
  }

  openDialog(eventId?: number) {
    if (eventId) {
      this.viewEventDetails(eventId);
    } else {
      this.isDialogVisible = true;
      this.eventForm.reset();
      this.selectedEventId = null;
    }
  }

  closeDialog() {
    this.isDialogVisible = false;
    this.eventForm.reset();
    this.selectedEventId = null;
  }

  addOrUpdateEvent() {
    if (this.eventForm.valid) {
      const event: EventDTO = this.eventForm.value;
      if (this.selectedEventId) {
        // Update existing event
        this.eventService.updateEventDTO(this.selectedEventId, event).subscribe(
          (response: EventDTO) => {
            const index = this.events.findIndex((e) => e.id === this.selectedEventId);
            this.events[index] = response;
            this.closeDialog();
          },
          (error) => console.error('Error updating event:', error)
        );
      } else {
        // Add new event
        this.eventService.createEventDTO(event).subscribe(
          (response: EventDTO) => {
            this.events.push(response);
            this.closeDialog();
          },
          (error) => console.error('Error adding event:', error)
        );
      }
    }
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEventDTO(eventId).subscribe(
      () => {
        const eventIndex = this.events.findIndex((e) => e.id === eventId);
        if (eventIndex !== -1) {
          this.events[eventIndex].isActive = false; // Update UI
        }
      },
      (error: any) => console.error('Error marking event as deleted:', error)
    );
  }
  

  viewEventDetails(eventId: number) {
    this.eventService.getEventDTOById(eventId).subscribe(
      (response: EventDTO) => {
        this.selectedEventId = eventId;
  
        const startTime = response.startTime ? new Date(response.startTime) : null;
        const endTime = response.endTime ? new Date(response.endTime) : null;
  
        this.eventForm.patchValue({
          ...response,
          startTime,
          endTime,
        });
  
        this.isDialogVisible = true;
      },
      (error) => console.error('Error fetching event details:', error)
    );
  }
  
  

  loadEvents() {
    this.eventService.getAllEventDTOs().subscribe(
      (response: EventDTO[]) => (this.events = response),
      (error: any) => console.error('Error loading events:', error)
    );
  }
  clearFilters() {
    this.searchParams = {
      eventName: '',
      category: null,
      startTime: null,
      endTime: null,
    };
    this.loadEvents(); 
  }
  filterEvents() {
    this.eventService.getAllEventDTOs().subscribe(
      (response: EventDTO[]) => {
        this.events = response.filter(event => {
          return (
            (!this.searchParams.eventName ||
              event.eventName.toLowerCase().includes(this.searchParams.eventName.toLowerCase())) &&
            (!this.searchParams.category || event.category === this.searchParams.category) &&
            (!this.searchParams.startTime || new Date(event.startTime) >= new Date(this.searchParams.startTime)) &&
            (!this.searchParams.endTime || new Date(event.endTime) <= new Date(this.searchParams.endTime))
          );
        });
      },
      (error: any) => console.error('Error filtering events:', error)
    );
  }
  searchParams = {
    eventName: '',
    category: null,
    startTime: null,
    endTime: null,
  };
}
