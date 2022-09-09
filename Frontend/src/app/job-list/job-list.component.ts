import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  title:String = "List of Job requirements";
  selItems: Array<object> = [];
  listJob = [{
    jobid : '',
    position: '',
    jd_text: '',
    number: ''
  }]
    constructor(private headservice : HeaderService,private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("employer");
    let empRef = localStorage.getItem("EmpId");
    this.jobService.getJobs(empRef).subscribe((data:any)=>{
      console.log("data")
      console.log(data);
    this.listJob = JSON.parse(JSON.stringify(data));
      console.log("results1")
      console.log(this.listJob);
      // console.log(this.rbooks[0]);
      // console.log(this.rbooks[0].title);
    });
  }
  
   viewJob(job:any){
    localStorage.setItem("JobId",job._id.toString());
    this.router.navigate(['employer/job-view']);
   }
   shortlistApp(job:any){
    localStorage.setItem("JobId",job._id.toString());
    this.router.navigate(['/employer/job-shortlist']);
   }

}
