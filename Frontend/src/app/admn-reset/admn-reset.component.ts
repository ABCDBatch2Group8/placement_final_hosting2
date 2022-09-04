import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admn-reset',
  templateUrl: './admn-reset.component.html',
  styleUrls: ['./admn-reset.component.css']
})
export class AdmnResetComponent implements OnInit {
  
    password:any
    cpassword:any
 
  admnID:any;
  
 
  constructor(
    private admn:AdmnAuthService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
     this.admnID=localStorage.getItem("editPwd")
  }
  resetAdmin(){
    if(this.password==this.cpassword){
      this.admn.editAdmin(this.admnID,this.password);
      this.router.navigate(['admin/adminlist'])
    }
    else{
       Swal.fire({
        toast: true,
        color: 'blue',
        background: 'white',
        icon: 'error',
        title: "Password missmatch",
        position: 'center',
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

}
