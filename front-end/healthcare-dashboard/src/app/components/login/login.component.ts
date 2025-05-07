import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignupService } from '../../services/signup.service';
import { ArtifactUtils } from '../../util/util';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    ButtonModule, 
    ToastModule,
    DropdownModule,
    RouterModule,
  ],
  providers: [MessageService// Configure HttpClient to use fetch API
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage!: string;
 roles = [
    { label: 'Patient', value: 'Patient' }, 
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Admin', value: 'Admin' },
    {label: 'Guardian', value: 'Guardian'}
  ];
  selectedRole: string | null = null;  // Stores the selected role ('doctor' or 'patient')
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private signupService: SignupService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]] ,
     
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      this.signupService.login(formData).subscribe({
        next: (response) => {
          const userRole = response.role;  
          this.signupService.setLoginStatus(response.token, userRole);
          // this.router.navigate(['/navbar/home']);

          if (userRole === 'DOCTOR') {
            this.router.navigate(['/doctor-main/doctor-dashboard']);
          } else if (userRole === 'PATIENT') {
            this.router.navigate(['/navbar/home']);
          } else if (userRole === 'ADMIN') {
            this.router.navigate(['/admin-main/admin-dashboard']);
          }
          else if (userRole === 'GUARDIAN') {
            this.router.navigate(['/guardian-main/guardian-dashboard']);
          }
  
          this.loginForm.reset();
        },
        error: (err) => {
          ArtifactUtils.showErrorViaToast(this.messageService, 'Invalid credentials or role');
          this.errorMessage = 'Invalid username, password, or role.';
          console.error('Login failed:', err);
          this.loginForm.reset();
        }
      });
    }
  }
  selectRole(role: string) {
    this.selectedRole = role;
    this.loginForm.patchValue({ role });
  }
}
