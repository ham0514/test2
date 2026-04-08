import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { MOCK_USERS } from '../data/mock-users';
import { AuthenticatedUser } from '../models/user.model';

const LOGIN_PATH = '/login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  private readonly currentUser = signal<AuthenticatedUser | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  login(username: string, password: string): Observable<void> {
    const u = username.trim();
    const p = password.trim();

    if (!u || !p) {
      return throwError(
        () => new Error('Please enter both username and password.'),
      );
    }

    const record = MOCK_USERS.find(
      (x) => x.username === u && x.password === p,
    );

    if (!record) {
      return throwError(
        () => new Error('Invalid username or password.'),
      ).pipe(delay(150));
    }

    const session: AuthenticatedUser = {
      username: record.username,
      displayName: record.displayName,
      role: record.role,
    };

    return of(undefined).pipe(
      delay(150),
      tap(() => this.currentUser.set(session)),
    );
  }

  logout(): void {
    this.currentUser.set(null);
    void this.router.navigate([LOGIN_PATH]);
  }
}
