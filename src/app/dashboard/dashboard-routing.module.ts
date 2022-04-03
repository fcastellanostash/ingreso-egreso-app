import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardroutes } from './dashboard.routes';

const routes : Routes = [
{  path : '', 
    component: DashboardComponent,
    children: dashboardroutes,
    //canActivate: [AuthGuard]
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ], 
  exports : [ RouterModule ]
})
export class DashboardRoutingModule { }
