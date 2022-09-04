import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';

@Component({
  selector: 'app-stud-apply',
  templateUrl: './stud-apply.component.html',
  styleUrls: ['./stud-apply.component.css']
})
export class StudApplyComponent implements OnInit {
  jobs={
    jobid:"",
    position:"",
    jd_text:"",
    numbers:'',
    salary: "",
    location:"",
    start_date:'',
    end_date:'',
    experience:''
  }
  constructor(private _apply:StudAuthService) { }

  ngOnInit(): void {
    let Id = localStorage.getItem("job");
    console.log("in stud-apply-comp"+Id)
    this._apply.job_applypage(Id).subscribe((data)=>{
      this.jobs=JSON.parse(JSON.stringify(data))
      console.log(data);
     

  })
  }
  Click(event:string) {
    console.log("in apply"+event);
    let id:string|null = localStorage.getItem("stud-id");
    console.log(id)
    let val={id,event}
    this._apply.application(val)
    }

}
