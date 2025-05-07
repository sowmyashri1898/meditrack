import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';  // For role selection UI
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, ButtonModule, 
    SelectButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  // Possible roles for users
  roles: any[] = [
    { label: 'Resident', value: 'PATIENT' },
    { label: 'Doctor', value: 'DOCTOR' },
    { label: 'Admin', value: 'ADMIN' },
    {label:'Guardian',value:'GUARDIAN'}
  ];

  constructor(private fb: FormBuilder, 
    private router: Router, private signupService: SignupService) {}

  ngOnInit(): void {

      this.signupForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['', [Validators.required]]
      }, { validators: this.passwordMatchValidator });
    
    
      // No need to call updateValueAndValidity manually here
    
    
    
   
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    // Check if both fields are not equal
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };  // Return the error key
    }
    
    return null; // Return null if passwords match
  }
  

  signUp(): void {
    console.log('Form Valid:', this.signupForm.valid);
    console.log('Password Valid:', this.signupForm.get('password')?.valid);
    console.log('Confirm Password Valid:', this.signupForm.get('confirmPassword')?.valid);
    console.log('Form Value:', this.signupForm.value);
    console.log('Form Valid:', this.signupForm.valid);
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      this.signupService.signUp(signupData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.successMessage = 'Account created successfully! Please log in.';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup failed', err);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      });
    }
  }
}
