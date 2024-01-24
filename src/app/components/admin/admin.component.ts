import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router, private translate: TranslateService){}

  pendingRequests(){
    this.router.navigate(['/PendingRequests']);
  }
  Jobs(){
    this.router.navigate(['/addDeleteJob']);
  }
  Users(){
    this.router.navigate(['/deleteChangeUser']);
  }
  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  
}
