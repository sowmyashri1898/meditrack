import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [RouterModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    CommonModule,
    CardModule,
    PanelModule,
    ReactiveFormsModule,
    DialogModule, FormsModule,
    CalendarModule, DropdownModule,TableModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {


  
    // Data for the current bill
    currentBill = {
      totalOutstanding: 250.00,
      dueDate: new Date('2024-11-20'),
      insuranceCoverage: 150.00,
      patientResponsibility: 100.00,
      status: 'Unpaid'
    };
  
    // Payment history data
    paymentHistory = [
      { paymentDate: new Date('2024-11-01'), amount: 50.00, method: 'Credit Card' },
      { paymentDate: new Date('2024-10-15'), amount: 150.00, method: 'PayPal' }
    ];
  
    // Insurance details
    insuranceDetails = {
      provider: 'HealthCare Insurance Co.',
      policyNumber: 'HC12345',
      coverageLimit: 500.00,
      coverageType: 'Full Coverage'
    };
  
    // Modal visibility
    paymentModalVisible = false;
    
    // Payment form data
    paymentAmount: number | null = null;
    paymentMethod: string = 'Credit Card';
  
    constructor() { }
  
    ngOnInit(): void {
      // Initialization logic can be added here
    }
  
    // Open the payment modal
    openPaymentModal() {
      this.paymentModalVisible = true;
    }
  
    // Close the payment modal
    closePaymentModal() {
      this.paymentModalVisible = false;
    }
  
    // Handle the payment submission
    submitPayment() {
      if (this.paymentAmount && this.paymentAmount > 0) {
        const newPayment = {
          paymentDate: new Date(),
          amount: this.paymentAmount,
          method: this.paymentMethod
        };
  
        // Add the new payment to the payment history
        this.paymentHistory.push(newPayment);
  
        // Update the bill status
        this.currentBill.status = 'Paid';
        
        // Update the outstanding balance
        this.currentBill.totalOutstanding -= this.paymentAmount;
  
        // Reset the payment form
        this.paymentAmount = null;
        this.paymentMethod = 'Credit Card';
  
        // Close the modal
        this.closePaymentModal();
        
        alert(`Payment of $${this.paymentAmount} was successful!`);
      } else {
        alert('Please enter a valid payment amount.');
      }
    }
  }
  
