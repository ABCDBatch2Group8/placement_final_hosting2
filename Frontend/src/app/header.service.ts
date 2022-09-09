import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  dispmenu = "<li><a>&nbsp;</a></li>";
  public navmenu = new BehaviorSubject(this.dispmenu);

  constructor() { }

  setMenu(authgrade:any) {
    if(authgrade=="student")
    {
      this.dispmenu = `<li><a href="student/home">Home</a></li>
                      <li><a href="student/job">Find Jobs </a></li>
                      <li><a routerLink="">Listing</a></li>
                      <li><a href="student/contact">Contact</a></li>`;
    }
    else if(authgrade=="employer")
    {
      this.dispmenu = `<li><a href="/employer/profile">Profile</a></li>
                      <li><a href="/employer/job-post">Post Job</a></li>
                      <li><a href="/employer/job-list">My Jobs</a></li>
                      <li><a href="#">Candidates</a>
                          <ul class="submenu">
                          <li><a href="">Update Appln Status</a></li>
                          <li><a href="/employer/offer-add">Add Offer</a></li>                          
                          </ul>
                      </li>
                      <li><a href="">Logout</a></li>`;
    }
    else{
      this.dispmenu = "<li><a>&nbsp;</a></li>";
    }
    this.navmenu.next(this.dispmenu);
  }
}
