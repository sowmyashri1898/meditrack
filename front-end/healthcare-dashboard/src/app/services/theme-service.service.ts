import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  private isDarkMode = false;
  private isLargeFont = false;

  constructor() {}

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode'); // Add dark-mode class to body
    } else {
      document.body.classList.remove('dark-mode'); // Remove dark-mode class from body
    }
  }
  

  // Toggle Font Size
  toggleFontSize(): void {
    this.isLargeFont = !this.isLargeFont;
    document.body.style.fontSize = this.isLargeFont ? '18px' : '16px';
  }

  // Get current dark mode status
  getDarkModeStatus(): boolean {
    return this.isDarkMode;
  }

  // Get current font size status
  getFontSizeStatus(): boolean {
    return this.isLargeFont;
  }
}
