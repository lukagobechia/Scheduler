import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private translate:TranslateService, private router: Router) {
    this.title = data.title;
    this.message = data.message;
  }

  goToLogIn(){
    this.router.navigate(['/login']);
    location.reload();
  }
}
