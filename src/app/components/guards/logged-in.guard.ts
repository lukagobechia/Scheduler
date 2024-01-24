import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loggedInGuard implements CanActivate {
  constructor(private router: Router) { }

  private decodeToken(token: any): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const jwtToken = localStorage.getItem('token');

    const decodedToken = this.decodeToken(jwtToken);

    const role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (jwtToken && role === 1) {
      this.router.navigate(['/admin']);
      return true;
    }

    else if (jwtToken && role === 2) {
      this.router.createUrlTree(['/worker']);
      return true
    }

    return true;
  } 
}
