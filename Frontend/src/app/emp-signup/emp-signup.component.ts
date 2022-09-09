import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpModel } from '../emp.model';
import { EmpService } from '../emp.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css']
})
export class EmpSignupComponent implements OnInit {
  title: String = "Please Register!";
  addEmp = new EmpModel('','','','','','');
  constructor(private headservice : HeaderService,private empService: EmpService, private router: Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
  }
  AddEmp(){
    console.log("In AddEmp")
    this.empService.newEmps(this.addEmp);
    this.router.navigate(['employer/login']);
    Swal.fire({
      toast: true,
      color: 'green',
      background: 'grey',
      icon: 'success',
      title: 'Successfully registered. Please login!',
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
  onReset(form: NgForm): void {
    form.reset();
  }
}