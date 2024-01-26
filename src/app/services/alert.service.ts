import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  openAlert(title: string, message: string): void {
    this.dialog.open(AlertComponent, {
      width: '500px',
      data: { title, message }
    });
  }
}
