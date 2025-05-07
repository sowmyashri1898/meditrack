import { Component, OnInit } from '@angular/core';
import { Fitness } from '../../classes/fitness.module';
import { FitnessService } from '../../services/fitness.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';

@Component({
  selector: 'app-fitness-program-details',
  standalone:true,
    imports:[OldAgeHeaderComponent,RouterModule,CommonModule,FormsModule],
  templateUrl: './fitness-program-details.component.html',
  styleUrls: ['./fitness-program-details.component.scss']
})
export class FitnessProgramDetailsComponent implements OnInit {
 fitnessPrograms: Fitness[] = [
    { name: 'Yoga', description: 'A relaxing practice', level: 'Beginner', typets: 'Static' },
    { name: 'HIIT', description: 'High intensity workout', level: 'Advanced', typets: 'Dynamic' }
  ];
  filteredPrograms: Fitness[] = [];
  difficultyLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  activityTypes: string[] = ['Yoga', 'Strength Training', 'Aerobics'];
  selectedDifficulty: string = '';
  selectedType: string = '';

  constructor(private fitnessService: FitnessService) {}

  ngOnInit(): void {
    // Fetch data from the service
    this.fitnessService.getFitnessPrograms().subscribe(data => {
      this.fitnessPrograms = data; // Initialize fitnessPrograms with data from the service
      this.filteredPrograms = data; // Set the filtered list to show all programs initially
    });
  }

  applyFilters(): void {
    // Filter the programs based on difficulty and type
    this.filteredPrograms = this.fitnessPrograms.filter(program => {
      const matchesLevel = this.selectedDifficulty ? program.level === this.selectedDifficulty : true;
      const matchesType = this.selectedType ? program.typets === this.selectedType : true;
      return matchesLevel && matchesType;
    });
  }
}

