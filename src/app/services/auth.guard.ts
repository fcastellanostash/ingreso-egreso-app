import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService : AuthService,
    private router : Router){}
  canActivate(): Observable<boolean>{
    return this.authService.isAuth().pipe(
      tap( userLog => {
            if(!userLog)this.router.navigate(['/login'])
      })
    );
  }
  
}
