import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Safely set item in localStorage
  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);  // Store data in localStorage
    }
  }

  // Safely get item from localStorage
  getItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);  // Retrieve data from localStorage
    }
    return null;  // Return null if not in browser
  }

  // Safely remove item from localStorage
  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);  // Remove data from localStorage
    }
  }

  // Check if we are in a browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
