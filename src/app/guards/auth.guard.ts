import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private appService: AppService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.getProfile(state);
        return true;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        // return this.canActivate(next, state);
        return true;
    }

    async getProfile(state: RouterStateSnapshot) {
        console.log(this.appService.user);
        
        if (this.appService.user) {
            if (this.appService.user.role === 1 && state.url.includes("account")) {
                this.router.navigate(["/"])
            }
            return true;
            
        }
        try {
            const userProfile = await this.appService.getAdminProfile().toPromise();
            console.log("user",userProfile);
            return true;
        } catch (error) {
            return false;
        }
    }
}
