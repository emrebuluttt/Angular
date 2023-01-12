import { HaberComponent } from './components/haber/haber.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { MenuComponent } from './components/menu/menu.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'profil',
    component: ProfilComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'Menüler',
    component: MenuComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'kategoriler',
    component: KategoriComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'haberler',
    component: HaberComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }