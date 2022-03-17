import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { dashboardroutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {  path : '', 
    component: DashboardComponent,
    children: dashboardroutes,
    canActivate: [AuthGuard]

  
  },
  {  path : 'login', component: LoginComponent},
  {  path : 'register', component: RegisterComponent},
  {  path : '**', redirectTo : ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
