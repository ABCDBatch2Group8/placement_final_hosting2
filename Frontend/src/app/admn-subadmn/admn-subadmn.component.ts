import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-admn-subadmn',
  templateUrl: './admn-subadmn.component.html',
  styleUrls: ['./admn-subadmn.component.css']
})
export class AdmnSubadmnComponent implements OnInit {

  email!:string;
  password!:string;
  admin={
    email:'',
    password:''
  }
  constructor(
    private admn:AdmnAuthService,
    private router:Router,
    private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
  }
  subAdmin(){
    
    const newadmin={
      email:this.admin.email,
      password:this.admin.password
    }
    this.admn.newAdmin(newadmin);
    this.router.navigate(['admin/adminlist'])
  }
  
  onReset(form: NgForm): void {
    form.reset();
  }

}
