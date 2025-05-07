import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
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
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const { oldPassword, newPassword, name, email, phone } = this.settingsForm.value;
  
      if (!email) {
        console.error('Email is required');
        alert('Please provide a valid email address');
        return;
      }
  
      // Call service to update password
      this.userService.updatePassword({ oldPassword, newPassword }).subscribe({
        next: (response) => {
          console.log('Password updated successfully', response);
          alert('Password updated successfully.');
        },
        error: (err) => {
          console.error('Password update failed', err);
          alert('Failed to update password.');
        },
      });
  
      // Optionally handle profile updates
      this.userService.updateProfile({ name, email, phone }).subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          alert('Profile updated successfully.');
        },
        error: (err) => {
          console.error('Profile update failed', err);
          alert('Failed to update profile.');
        },
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
  
}