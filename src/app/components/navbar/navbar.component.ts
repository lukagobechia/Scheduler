import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private FuncService: FuncService, 
    private translate: TranslateService,
     private router: Router,
     private renderer: Renderer2) {
    translate.setDefaultLang('en');
  }
  Role: string = '';
  RoleID:any;
  FName: string = '';
  LName: string = '';
  ngOnInit(): void {
    const jwtToken:any = localStorage.getItem('token');
    const decodedToken = this.decodeToken(jwtToken);
    this.FName = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    this.LName = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];   
    this.RoleID = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
    if(this.RoleID == '1'){
      this.Role = "Admin's Dashboard"
    } else{ this.Role = "Worker's Dashboard"}
  }
  logOut() {
    this.FuncService.logOut();
  }
  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

  HOME() {
    if (this.RoleID === '1') {
      this.router.navigate(['/admin']);
    } else if (this.RoleID === '2') {
      this.router.navigate(['/worker']);
    }
    else {
      console.log('Login failed. Please check your credentials', 'Error');
    }
  }

  showSidebar() {
    const sidebar = document.querySelector('.sidebar-toggle');
    this.renderer.setStyle(sidebar, 'display', 'block');
  }

  hideSidebar() {
    const sidebar = document.querySelector('.sidebar-toggle');
    this.renderer.setStyle(sidebar, 'display', 'none');
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // Hide the sidebar when the screen size is normal and the sidebar is visible
    if (window.innerWidth > 1050) {
      this.hideSidebar();
    }
  }
}
