import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {

   title:string = (localStorage.getItem("EmpComp")!)

  constructor(private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("employer");
  }

}
