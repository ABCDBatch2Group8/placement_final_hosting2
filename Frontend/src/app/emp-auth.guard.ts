import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpService } from './emp.service';

@Injectable({
  providedIn: 'root'
})
export class EmpAuthGuard implements CanActivate {
  constructor(private auth:EmpService, private router:Router){}
  canActivate():boolean{
    if (this.auth.loggedIn() ) {
      return true
    }
    else{
      this.router.navigate(['employer'])
      return false;
    }
  }
  
}
