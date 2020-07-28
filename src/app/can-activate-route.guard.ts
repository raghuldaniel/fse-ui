import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/services/authentication.service';
import { RouterService } from 'app/services/router.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const promise = this.authService.isUserAuthenticated(this.authService.getBearerToken());
    promise.then(isValid => {
      if (!isValid) {
        console.log(isValid);
        this.routerService.routeToLogin();
      }
    });
    return promise;
  }
}
