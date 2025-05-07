import { Component } from '@angular/core';
import { SmartScreensService } from '../../services/smart-screens.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';

@Component({
  selector: 'app-smart-screens-details',
  standalone:true,
  imports:[OldAgeHeaderComponent,RouterModule,CommonModule,FormsModule],
  templateUrl: './smart-screens-details.component.html',
  styleUrls: ['./smart-screens-details.component.scss']
})
export class SmartScreensDetailsComponent {
  functionalities: string[] = [];
  selectedFunctionality: string = '';
  filteredFeatures: string[] = [];
  features!: string[];
  constructor(private screensService:SmartScreensService ){}
  ngOnInit(): void {
    this.screensService.getSmartScreenFeatures().subscribe(data => {
      this.features = data;
      this.filteredFeatures = data;
      this.functionalities = ['Entertainment', 'Health Monitoring', 'Video Calls']; // Example categories
    });
  }
  
  applyFilter(): void {
    this.filteredFeatures = this.features.filter(feature =>
      this.selectedFunctionality ? feature.includes(this.selectedFunctionality) : true
    );
  }
  
}
