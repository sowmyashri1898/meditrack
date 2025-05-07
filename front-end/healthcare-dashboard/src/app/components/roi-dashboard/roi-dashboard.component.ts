import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-roi-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent,CommonModule],
  
  providers:[CurrencyPipe],
  templateUrl: './roi-dashboard.component.html',
  styleUrl: './roi-dashboard.component.scss'
})
export class ROIDashboardComponent implements OnInit {
costSavings: any;
diagnosticAccuracy: any;
  ngOnInit(): void {
    Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend);

    // new Chart('roiChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['Cost Savings', 'Improved Accuracy', 'Patient Satisfaction'],
    //     datasets: [{
    //       label: 'ROI Metrics',
    //       data: [12, 19, 3], // Example data, replace with actual values
    //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //       borderColor: 'rgba(75, 192, 192, 1)',
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }  }


