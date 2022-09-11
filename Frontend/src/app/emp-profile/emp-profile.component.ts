import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpModel } from '../emp.model';
import { EmpService } from '../emp.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {

  EmpProf = new EmpModel('','','','','','');

  constructor(private headservice : HeaderService,private empService: EmpService, private router: Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("employer");
    let empId = localStorage.getItem("EmpId");
    this.empService.empProf(empId).subscribe((data:any)=>{
      this.EmpProf = JSON.parse(JSON.stringify(data));
    })
    
  }
  editProf(){
    console.log("In editProf")
    this.empService.EdProf(this.EmpProf).subscribe((res:any)=>{
    alert(res.message);
    })
    alert("Profile updated");
    this.router.navigate(['/employer/dashboard'])
  }

  back(){
    this.router.navigate(['employer/dashboard']);
  }

}
