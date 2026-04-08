import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_GAMES } from '../../data/mock-games';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game.model';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class MenuPage {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly games: Game[] = MOCK_GAMES;

  displayName(): string {
    const u = this.auth.user();
    if (!u) return '';
    return u.displayName ?? u.username;
  }

  openGame(game: Game): void {
    if (game.status !== 'available') {
      return;
    }
    void this.router.navigateByUrl(game.route);
  }

  logout(): void {
    this.auth.logout();
  }
}
