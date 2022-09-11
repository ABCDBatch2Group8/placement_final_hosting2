import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { StudAuthService } from '../stud-auth.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-login',
  templateUrl: './stud-login.component.html',
  styleUrls: ['./stud-login.component.css']
})
export class StudLoginComponent implements OnInit {

  user={email:'',
  password:''}
  constructor(private headservice : HeaderService,private _auth: StudAuthService,private _router:Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
  }
  loginUser () {
    
    this._auth.loginUser(this.user)
    
    .subscribe({
      next: (res:any) => {
            let x= JSON.stringify(res)
            if(x.match(/invalid/)){
              Swal.fire({
                toast: true,
                color:'red',
                background:'yellow',
                 icon: 'error',
                title: 'wrong Email or password',
                position: 'center-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
            }
            else{
              console.log("res id is",res.id);
              console.log("token",res.tok);
              localStorage.setItem('stud-id',res.id);
              localStorage.setItem('stud-token',res.tok);
              localStorage.setItem("AuthUser","student");
            // localStorage.setItem('token', res.token)
            Swal.fire({
              toast: true,
              color:'green',
              // background:'whit',
              icon: 'success',
              title: 'verified',
              position: 'center-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
            this._router.navigate(['student/home'])
          }} ,
      error: (err:any) => {
            console.log(err);
            Swal.fire({
              toast: true,
              color:'red',
              background:'yellow',
              icon: 'error',
              title: 'wrong email or password',
              position: 'center-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
            this._router.navigate(['student/signup'])
          }
   }); 
   }
}

