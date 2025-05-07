import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-guardian-navbar',
  standalone: true,
  imports: [ToolbarModule,RouterModule,ButtonModule,CommonModule,BreadcrumbModule],
  templateUrl: './guardian-navbar.component.html',
  styleUrl: './guardian-navbar.component.scss'
})
export class GuardianNavbarComponent implements OnInit{

  @Output() sidebarToggle = new EventEmitter<void>();
  sidebarVisible: boolean = true; // Initial state of the sidebar visibility
  breadcrumbItems!: any[];

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.setBreadcrumb();

    // Listen for router changes to update breadcrumb dynamically
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setBreadcrumb();
    });
  }

  toggleSidebar() {
    this.sidebarToggle.emit();  // Emit the event to toggle the sidebar in parent component
  }
  setBreadcrumb() {
    const path = this.router.url.split('/').filter(segment => segment);

    this.breadcrumbItems = path.map((segment, index) => {
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
        url: '/' + path.slice(0, index + 1).join('/')
      };
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/header/login']);  // Navigate to the login page
  }
  onProfile() {
    this.router.navigate(['/guardian-main/guardian-profile'])
  }
  onNotification() {
    this.router.navigate(['/guardian-main/guardian-notification'])
  }
}
