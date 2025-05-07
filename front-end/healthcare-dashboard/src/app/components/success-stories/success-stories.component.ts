import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';

@Component({
  selector: 'app-success-stories',
  standalone:true,
  imports:[CommonModule,CardModule,OldAgeHeaderComponent],
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent implements OnInit {
    residentStories = [
      {
        name: 'John Doe',
        quote: 'The VR sessions have truly brought back the joy in my life. I feel more connected and engaged.'
      },
      {
        name: 'Jane Smith',
        quote: 'I never thought I could feel so active again, but the fitness programs have been a game-changer for me.'
      }
    ];
  
    // Sample data for Family/Staff Stories
    familyStories = [
      {
        name: 'Mary Adams',
        role: 'Daughter',
        quote: 'Seeing my father engage with the technology has brought a smile to his face every day.'
      },
      {
        name: 'Sarah Lee',
        role: 'Staff',
        quote: 'The interactive screens have made it so much easier to communicate with the residents and enhance their activities.'
      }
    ];
  
    // Sample impact metrics
    impactMetrics = {
      physicalActivityIncrease: 40,
      cognitiveImprovement: 35,
      satisfaction: 90
    };
  
    constructor() { }
  
    ngOnInit(): void {
    }
  }
  

