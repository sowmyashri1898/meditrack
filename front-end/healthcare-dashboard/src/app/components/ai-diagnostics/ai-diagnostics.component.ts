import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-diagnostics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-diagnostics.component.html',
  styleUrl: './ai-diagnostics.component.scss'
})
export class AIDiagnosticsComponent {
aiResults: any;
uploadImage() {
throw new Error('Method not implemented.');
}
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

}
