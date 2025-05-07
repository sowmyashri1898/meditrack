import { CommonModule } from '@angular/common';
import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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

import { NotificationService } from '../../services/notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
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
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit ,OnDestroy{
  notifications: any[] = [];
  errorMessages: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // this.notificationService.getNotifications().subscribe({
    //   next: (message) => {
    //     this.notifications.push(message);
    //   },
    //   error: (error) => {
    //     this.errorMessages.push('Error receiving message: ' + error);
    //   }
    // });

    // this.notificationService.getErrors().subscribe((error) => {
    //   console.error('Error:', error);
    // });
    // this.notificationService.getSavedNotifications(this.token).subscribe((savedNotifications) => {
    //   this.notifications = [...this.notifications, ...savedNotifications];
    // });
    // console.log('Notifications:',this.no)
  }

  sendTestMessage() {
    this.notificationService.sendMessage('Test message');
  }

  ngOnDestroy(): void {
    this.notificationService.closeConnection();
  }
}