import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  public submit() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      secureToken: true
    }

    this.authService.auth(user)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.idToken as string);
          this.router.navigate(['/dashboard']);
        }
      })

  }

}