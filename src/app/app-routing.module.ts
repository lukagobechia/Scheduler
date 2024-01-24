import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { WorkerComponent } from './components/worker/worker.component';
import { AdminComponent } from './components/admin/admin.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PendingRequestsComponent } from './components/admin/pending-requests/pending-requests.component';
import { DeleteChangeUserComponent } from './components/admin/delete-change-user/delete-change-user.component';
import { AddDeleteJobComponent } from './components/admin/add-delete-job/add-delete-job.component';
import { AdminGuard } from './components/guards/admin-guard.guard';
import { WorkerGuard } from './components/guards/worker-guard.guard';
import { loggedInGuard } from './components/guards/logged-in.guard';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'worker', component: WorkerComponent, canActivate: [WorkerGuard]},
  {path:'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path:'schedule', component: ScheduleComponent},
  {path:'navbar', component: NavbarComponent},
  {path:'PendingRequests', component: PendingRequestsComponent},
  {path:'deleteChangeUser', component: DeleteChangeUserComponent},
  {path:'addDeleteJob', component: AddDeleteJobComponent},
  {path:'', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
