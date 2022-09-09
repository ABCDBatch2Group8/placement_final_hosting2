import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  authsect:any;

  constructor(private headservice : HeaderService) { }

  ngOnInit(): void {
    this.authsect=localStorage.getItem("AuthUser");
    if(this.authsect=="employer"){
      this.headservice.setMenu("employer");
    }
    else if(this.authsect=="student"){
      this.headservice.setMenu("student");
    }
    else{
      this.headservice.setMenu("general");
    }
    
  }

}
