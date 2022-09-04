import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';

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
    experience:''
  }]

  constructor(private history:StudAuthService) { }

  ngOnInit(): void {
    let id = localStorage.getItem("stud-id")
    this.history.job_history(id).subscribe((data)=>{
      this.jobs=JSON.parse(JSON.stringify(data))
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
