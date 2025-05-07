import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {

}
