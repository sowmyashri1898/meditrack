import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-solution',
  imports: [OldAgeHeaderComponent, RouterModule, CommonModule, FormsModule,CardModule],
  standalone:true,
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent {
  vrImages = [
    'assets/images/vr1.jpeg',
    'assets/images/vr2.jpeg',
    'assets/images/vr3.jpeg'
  ];

  // Testimonials or success stories for the fitness section carousel
  fitnessTestimonials = [
    { text: 'The fitness program has helped me feel stronger and more independent.' },
    { text: 'I can now enjoy better mobility and energy thanks to these programs!' },
    { text: 'It is fun and easy to follow, and I feel healthier every day!' }
  ];

}
