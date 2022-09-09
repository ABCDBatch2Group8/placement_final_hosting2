import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
export class Admin{
  constructor(
    public email:string,
    public password:string
  ){}
}

@Component({
  selector: 'app-admn-list',
  templateUrl: './admn-list.component.html',
  styleUrls: ['./admn-list.component.css']
})
export class AdmnListComponent implements OnInit {
  admin:any;

  rpwd={
    pwd:'',
    cpwd:''
  }
   
  rpwdid:any;
  rpwdemail:any;
  cmppwd:any;

  displayStyle = "none";
  statsetStyle = "none";
  statusLabel = "";
  removerreferer:any;

  statsetreferer:any;
  statsetval = "";
  delstat:any;

  showform="none";
  password:any
  cpassword:any
  admnID:any;

  msg:any;

  constructor(
    private admn:AdmnAuthService,
    private router:Router,
    private http:HttpClient,
    private headservice : HeaderService
    ) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
    this.getAdmin()
  }
  getAdmin(){
    this.http.get("http://localhost:3000/admin/admins").subscribe(
      response=>{
        this.admin=response;
        console.log(response)
      }
    )
  }

  status(admin:any,cursta:any)
    {
      
        if(cursta=='Disable'){
         this.statusLabel = "Disable";
         this.statsetval = 'Enable';
        }
        else{
         this.statusLabel = "Enable";
         this.statsetval = 'Disable';
        }
        this.statsetreferer = admin._id;
        this.admn.statusAdmin(this.statsetreferer,this.statsetval) 
        this.statsetStyle = "block";
        this.router.navigate(['admin/adminlist'])
        .then(() => {
          window.location.reload();
        });
    }
    reset(admin:any){
      localStorage.setItem("editPwd", admin._id.toString());
        this.router.navigate(['admin/reset'])
    }
    subAdmin(){
      
      const newadmin={
      email:this.admin.email,
      password:this.admin.password
    }
    this.admn.newAdmin(newadmin)
    .subscribe((data)=>{
      this.msg=JSON.parse(JSON.stringify(data))
      alert('yes')
    })
    
    this.router.navigate(['admin/adminlist'])
    .then(() => {
      window.location.reload();
      });

    }
    onReset(form: NgForm): void {
      form.reset();
    }

    getId(subadmn:any){
     
      this.admnID=subadmn._id;
      this.displayStyle = "block";
    }

    
    
    rpwdref(ref:any){
      this.rpwdid=ref._id;
      this.rpwdemail=ref.email;
    }
    resetAdmin(){

      alert(this.rpwdid)
      const newpwd={
        pwd:this.rpwd.pwd,
        cpwd:this.rpwd.cpwd
      }
      alert(newpwd.pwd)
      if(newpwd.pwd===newpwd.cpwd){
        this.admn.editAdmin(this.rpwdid,newpwd.pwd);
        this.router.navigate(['admin/adminlist'])
        .then(() => {
          window.location.reload();
          });
      }
      else{
        this.cmppwd="Password is not matching"
        alert("Password is not matching")
      }
    }
    
}
