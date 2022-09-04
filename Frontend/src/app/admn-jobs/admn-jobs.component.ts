import { Component, OnInit } from '@angular/core';
import { AdmnEmployerService } from '../admn-employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admn-jobs',
  templateUrl: './admn-jobs.component.html',
  styleUrls: ['./admn-jobs.component.css']
})
export class AdmnJobsComponent implements OnInit {

  jobslist:any;
  emptyJoblist  = "";
  jobprofile : any;
  previewStyle = "none";

  pvjobtitle  = '';
  pvjobcompany = '';
  pvjobjd = '';
  pvjobopening = '';
  pvjobsalary = '';
  pvjobskills:any;
  pvjoblocation = '';
  pvjobsdate = '';
  pvjobedate = '';

  constructor(private admnemployer : AdmnEmployerService, private route : Router) { }

  ngOnInit(): void {
    //Set employers Jobs list
    this.admnemployer.setFullJoblist().subscribe((jobdata)=>{
      if(jobdata==""){
        this.emptyJoblist = "No Jobs found posted";
      }
      this.jobslist=JSON.parse(JSON.stringify(jobdata));                 
      })
  }

  previewJob(jobid:any){
    this.admnemployer.previewJob(jobid).subscribe((jobinfo)=>{
      this.jobprofile = JSON.parse(JSON.stringify(jobinfo)); 
      this.pvjobtitle = this.jobprofile.position; 
      this.pvjobcompany = this.jobprofile.company; 
      this.pvjobopening = this.jobprofile.number; 
      this.pvjobsdate = this.jobprofile.start_date;
      this.pvjobedate = this.jobprofile.end_date; 
      this.pvjoblocation = this.jobprofile.location; 
      this.pvjobsalary = this.jobprofile.salary; 
      this.pvjobjd = this.jobprofile.jd_text; 
      this.pvjobskills = this.jobprofile.skills;     
    })
    this.previewStyle = "block";
  }

  closePreview() {
    this.previewStyle = "none";    
  }

}
