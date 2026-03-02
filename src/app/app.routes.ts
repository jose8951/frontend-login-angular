import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Pokemon } from './components/pokemon/pokemon';
import { Superheroes } from './components/superheroes/superheroes';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'pokemon', component: Pokemon, canActivate: [authGuard] },
  { path: 'superheroes', component: Superheroes, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir al login al abrir la app
  { path: '**', redirectTo: 'login' }, // Si escriben cualquier cosa, al login
];
