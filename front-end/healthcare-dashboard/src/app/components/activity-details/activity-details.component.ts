import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { OldAgeHeaderComponent } from "../old-age-header/old-age-header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-details',
  standalone:true,
  imports:[OldAgeHeaderComponent,RouterModule,CommonModule,FormsModule],
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  categories: string[] = ['Virtual Reality', 'Smart Screen', 'Fitness', 'Games'];
  selectedCategory = '';
  searchKeyword = '';
  selectedDate = '';
  sortBy = 'relevance';

  activities: any[] = [];
  filteredActivities: any[] = [];
  upcomingActivities: any[] = [];
  pastActivities: any[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {
    const filters = {
      category: this.selectedCategory,
      keyword: this.searchKeyword,
      date: this.selectedDate,
      sortBy: this.sortBy,
    };

    this.activityService.fetchActivities(filters).subscribe((data) => {
      // Split activities into upcoming and past
      const currentDate = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format
      this.upcomingActivities = data.filter(activity => activity.date >= currentDate);
      this.pastActivities = data.filter(activity => activity.date < currentDate);

      // Sort based on selected criteria
      if (this.sortBy === 'date') {
        this.upcomingActivities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.pastActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (this.sortBy === 'popularity') {
        // For simplicity, sorting by name (you can change to any other popularity metric)
        this.upcomingActivities.sort((a, b) => a.name.localeCompare(b.name));
        this.pastActivities.sort((a, b) => a.name.localeCompare(b.name));
      }

      this.filteredActivities = [...this.upcomingActivities, ...this.pastActivities];
    });
  }

  applyFilters(): void {
    const filters = {
      category: this.selectedCategory,
      keyword: this.searchKeyword,
      date: this.selectedDate,
      sortBy: this.sortBy,
    };

    this.activityService.fetchActivities(filters).subscribe((data) => {
      // Split into upcoming and past
      const currentDate = new Date().toISOString().split('T')[0];
      this.upcomingActivities = data.filter(activity => activity.date >= currentDate);
      this.pastActivities = data.filter(activity => activity.date < currentDate);

      if (this.sortBy === 'date') {
        this.upcomingActivities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.pastActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (this.sortBy === 'popularity') {
        this.upcomingActivities.sort((a, b) => a.name.localeCompare(b.name));
        this.pastActivities.sort((a, b) => a.name.localeCompare(b.name));
      }

      // Combine and update filteredActivities
      this.filteredActivities = [...this.upcomingActivities, ...this.pastActivities];
    });
  }
}
