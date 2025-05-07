import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-old-age-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './old-age-header.component.html',
  styleUrl: './old-age-header.component.scss'
})
export class OldAgeHeaderComponent {
  currentSlideIndex = 0;

  ngAfterViewInit() {
    this.startSlider();
  }

  startSlider() {
    const slidesContainer = document.querySelector('.slides') as HTMLElement;
    const slides = document.querySelectorAll('.slide');

    setInterval(() => {
      this.currentSlideIndex =
        (this.currentSlideIndex + 1) % slides.length; // Loop through slides
      slidesContainer.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    }, 3000); // Change slide every 3 seconds
  }
}
