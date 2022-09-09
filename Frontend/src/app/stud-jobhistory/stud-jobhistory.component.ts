import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-jobhistory',
  templateUrl: './stud-jobhistory.component.html',
  styleUrls: ['./stud-jobhistory.component.css']
})
export class StudJobhistoryComponent implements OnInit {

  
  jobs =[ {
    _id:'',
    // name:"",
    position:"",
    jd_text:"",
    numbers:'',
    salary: "",
    location:"",
    start_date:'',
    end_date:'',
    experience:'',
    applicants:[{
      
    stud_ref:'',
      shortlist_status:false,
      application_status:''
    }]
  }]
  stu = localStorage.getItem("stud-id")
  

  constructor(private history:StudAuthService, private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
    let id = localStorage.getItem("stud-id")
    this.history.job_history(id).subscribe((data)=>{
      this.jobs=JSON.parse(JSON.stringify(data))
      let x = JSON.parse(JSON.stringify(data));
        console.log("in stud-jobhistory component :",data)
      
        
    })
  }
  onClick(event:string) {
    localStorage.removeItem('job');
    console.log("in joblist"+event);
    localStorage.setItem('job',event)
    // this.jobservice.job_applyid(event);
    // localStorage.setItem('id',event);
    
    
  }
  

}
