import { Component, OnInit } from '@angular/core';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admn-login',
  templateUrl: './admn-login.component.html',
  styleUrls: ['./admn-login.component.css']
})
export class AdmnLoginComponent implements OnInit {
  email!:string
  password!:string
  constructor(
    private admnauth:AdmnAuthService,
    private router:Router,
    private headservice : HeaderService
    ) { }

  constructor(
    private admnauth:AdmnAuthService,
    private router:Router,
    private headservice : HeaderService
    ) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
  }
loginAdmin(){
  const admin={
    email:this.email,
    password:this.password
  }
  
 this.admnauth.admnlogin(admin)
 .subscribe((data:any)=>{
  if(data.status=="success"){
    localStorage.setItem("token",data.tok)
    //alert('valid');
    this.router.navigate(['admin/dashboard'])
  }
  else if(data.success=="fail"){
    
    Swal.fire({
      toast: true,
      color: 'blue',
      background: 'white',
      icon: 'error',
      title: "invalid username or password",
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mousecenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    this.router.navigate(['admin'])
  }
  else{
    alert("invalid email")
  }
  
 })
 }
}
 

