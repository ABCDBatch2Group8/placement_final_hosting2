import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpModel } from '../emp.model';
import { EmpService } from '../emp.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {

  user = {
    "email":'',
    "password":''
  };

  constructor(private headservice : HeaderService,private empService: EmpService, private router: Router) { }

  EmpLogin(){
    console.log("In employer service");
    this.empService.employerLogin(this.user)
        .subscribe(
          (res:any) =>{
            console.log("res id is",res.eid)
            //  console.log("res.token is",res.token)
            console.log("res.empToken")
            if (res.status == "success") {
              localStorage.setItem("EmpId",res.eid);
              localStorage.setItem("EmpComp",res.company);
              localStorage.setItem("AuthUser","employer");
              localStorage.setItem("empToken",res.token);
              this.router.navigate(['employer/dashboard'])
            }
            else{
              Swal.fire({
                toast: true,
                color: 'blue',
                background: 'grey',
                icon: 'error',
                title: res.message,
                position: 'center-left',
                showConfirmButton: false,
                timer: 10000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mousecenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              

            }
          }
        )
  }

  ngOnInit(): void {
    this.headservice.setMenu("general");
  }
}
