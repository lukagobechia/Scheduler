import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { WorkerComponent } from './components/worker/worker.component';
import { AdminComponent } from './components/admin/admin.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatTableModule } from '@angular/material/table';
import { RequestComponent } from './components/schedule/request/request.component';
import { CurrentDateComponent } from './components/schedule/current-date/current-date.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/schedule/table/table.component';
import { PendingRequestsComponent } from './components/admin/pending-requests/pending-requests.component';
import { DeleteChangeUserComponent } from './components/admin/delete-change-user/delete-change-user.component';
import { AddDeleteJobComponent } from './components/admin/add-delete-job/add-delete-job.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    WorkerComponent,
    AdminComponent,
    ScheduleComponent,
    RequestComponent,
    CurrentDateComponent,
    NavbarComponent,
    TableComponent,
    PendingRequestsComponent,
    DeleteChangeUserComponent,
    AddDeleteJobComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
