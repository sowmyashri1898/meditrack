import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule,ButtonModule,RouterModule,CommonModule,BreadcrumbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  breadcrumbItems!: any[];

  @Output() sidebarToggle = new EventEmitter<void>();
  sidebarVisible: boolean = true; 

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
  setBreadcrumb() {
    const path = this.router.url.split('/').filter(segment => segment);

    this.breadcrumbItems = path.map((segment, index) => {
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
        url: '/' + path.slice(0, index + 1).join('/')
      };
    });
  }
  toggleSidebar() {
    this.sidebarToggle.emit();  
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/header/login']);  
  }
  onProfile() {
    this.router.navigate(['/admin-main/admin-profile'])
  }
  onNotification() {
    this.router.navigate(['/admin-main/admin-notification'])
  }
}
