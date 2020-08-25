import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegendComponent } from './legend/legend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegendDetailComponent } from './legend-detail/legend-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'legends', component: LegendComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LegendDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
