import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  errorMessage = '';
  submitting = false;

  onSubmit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    const { username, password } = this.form.getRawValue();
    this.submitting = true;

    this.auth.login(username, password).subscribe({
      next: () => {
        this.submitting = false;
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') ?? '/menu';
        const safe =
          returnUrl.startsWith('/') && !returnUrl.startsWith('//')
            ? returnUrl
            : '/menu';
        void this.router.navigateByUrl(safe);
      },
      error: (err: Error) => {
        this.submitting = false;
        this.errorMessage = err.message ?? 'Login failed.';
      },
    });
  }
}
