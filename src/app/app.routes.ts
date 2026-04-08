import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { LoginPage } from './pages/login/login';
import { MenuPage } from './pages/menu/menu';
import { TicTacToePage } from './pages/tic-tac-toe/tic-tac-toe';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [guestGuard],
  },
  {
    path: 'menu',
    component: MenuPage,
    canActivate: [authGuard],
  },
  {
    path: 'games/tic-tac-toe',
    component: TicTacToePage,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
