import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { setCookie } from '../../../helper/cookie';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          const time = 365;
          setCookie("access_token", res.data.access_token, time)
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.router.navigate(['/admin'])
        },
        error => {
          if (error.error.message === "Email không tồn tại!!!") {
            const emailControl = this.loginForm.get('email');
            if (emailControl) {
              emailControl.setErrors({ email_incorrect: true });
            }
          }
          else if (error.error.message === "Sai mật khẩu!!!") {
            const passwordControl = this.loginForm.get('password');
            if (passwordControl) {
              passwordControl.setErrors({ password_incorrect: true });
            }
          }
        }
      )
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
