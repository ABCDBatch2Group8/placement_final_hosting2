import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  dispmenu = "<li><a>&nbsp;</a></li>";
  public navmenu = new BehaviorSubject(this.dispmenu);

  constructor(private router: Router) { }

  setMenu(authgrade:any) {
    if(authgrade=="student")
    {
      this.dispmenu = `<li><a href="student/home">Home</a></li>
                      <li><a href="student/job">Find Jobs </a></li>
                      <li><a href="student/contact">Contact</a></li>
                      <li><a href="logout">Logout</a></li>`;
                      
    }
    else if(authgrade=="employer")
    {
      this.dispmenu = `<li><a href="/employer/dashboard">Dashboard</a></li>
                      <li><a href="/employer/profile">Profile</a></li>
                      <li><a href="/employer/job-post">Post Job</a></li>
                      <li><a href="/employer/job-list">My Jobs</a></li>
                      <li><a >Candidates</a>
                          <ul class="submenu">
                          <li><a href="employer/appln-status">Update Appln Status</a></li>
                          <li><a href="/employer/offer-add">Add Offer</a></li>                          
                          </ul>
                      </li>
                      <li><a href="logout">Logout</a></li>`;
    }
    else{
      this.dispmenu = "<li><a>&nbsp;</a></li>";
    }
    this.navmenu.next(this.dispmenu);
  }
}
