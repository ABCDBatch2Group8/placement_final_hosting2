import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmnAuthService } from '../admn-auth.service';

@Component({
  selector: 'app-admn-menu',
  templateUrl: './admn-menu.component.html',
  styleUrls: ['./admn-menu.component.css']
})
export class AdmnMenuComponent implements OnInit { 
   
  constructor(private admn:AdmnAuthService,private router:Router) { }

  ngOnInit(): void {  
   
  }
  logoutAdmin(){
    localStorage.removeItem('token')
    this.router.navigate(['admin'])
  }

}
