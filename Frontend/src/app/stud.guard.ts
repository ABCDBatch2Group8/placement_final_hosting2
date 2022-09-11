import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudAuthService } from './stud-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudGuard implements CanActivate {
constructor(private auth:StudAuthService,private route :Router){}
  canActivate(): boolean  {
    if(this.auth.loggedIn()){
      return true
    }
    else{
      this.route.navigate['']
return false
    }
  }
  
}
