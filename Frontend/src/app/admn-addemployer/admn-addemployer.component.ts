import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpModel } from '../emp.model';
import { NgForm } from '@angular/forms';
import { AdmnEmployerService } from '../admn-employer.service';

@Component({
  selector: 'app-admn-addemployer',
  templateUrl: './admn-addemployer.component.html',
  styleUrls: ['./admn-addemployer.component.css']
})
export class AdmnAddemployerComponent implements OnInit {

  addEmp = new EmpModel('','','','','','');
  statsetStyle = "none";
  emppoststatus = "";
  failmessage = "";

  constructor(private admnemployer : AdmnEmployerService, private route : Router) { }

  ngOnInit(): void {
  } 

  AddEmp(){
    //alert(this.addEmp.title);
    this.admnemployer.newEmps(this.addEmp).subscribe(
      (res:any) =>{        
        if (res.status == "success") {
          this.emppoststatus=res.message;
          this.statsetStyle = "block";          
        }
        else{
          this.failmessage=res.message;
        }
      }) 
    
  }

  closeStatpop() {
    this.statsetStyle = "none"; 
    this.route.navigate(['admin/employer']);   
  }

}
