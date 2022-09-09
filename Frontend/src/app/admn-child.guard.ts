import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router} from '@angular/router';
import { AdmnAuthService } from './admn-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmnChildGuard implements CanActivateChild {
  constructor(private admn:AdmnAuthService,private router:Router){}
  canActivateChild():boolean {
    if(this.admn.logedIN())
    {
      return true;
    }
    else{
      this.router.navigate([''])
      return false;

    }
  }
  
}
