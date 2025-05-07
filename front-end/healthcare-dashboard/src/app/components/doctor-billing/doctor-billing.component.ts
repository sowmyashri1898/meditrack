import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-billing',
  standalone: true,
  imports: [MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule, 
    MatListModule, MatFormFieldModule, 
    MatInputModule,MatSelectModule,FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './doctor-billing.component.html',
  styleUrl: './doctor-billing.component.scss'
})
export class DoctorBillingComponent {
onPayBill() {
throw new Error('Method not implemented.');
}
bill: any;
onViewBill(_t14: any) {
throw new Error('Method not implemented.');
}
bills: any;

}
