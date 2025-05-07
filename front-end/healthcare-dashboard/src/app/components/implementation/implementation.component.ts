import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-implementation',
  standalone:true,
  imports:[OldAgeHeaderComponent,RouterModule,CommonModule,FormsModule,CardModule],
  templateUrl: './implementation.component.html',
  styleUrls: ['./implementation.component.scss']
})
export class ImplementationComponent {

}
