import { Injectable } from '@angular/core';
import {  CanActivate,Router } from '@angular/router';
import { AdmnAuthService } from './admn-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmnAuthGuard implements CanActivate {
  constructor(private admn:AdmnAuthService,private router:Router){}
  canActivate():boolean{
    return true
  }
  }
  

