import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from '../job.model';
import { JobService } from '../job.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {
  // kills: Array<any> = [{"item_num":null,"item_text":""}];
  skillsList: String = '';
  skills: Array<any> = [];
  selItems: Array<object> = [];
  viewJob = new JobModel('','','','','','','',this.selItems,'',null!,null!);
  
 
  constructor(private headservice : HeaderService,private jobService: JobService,  private router: Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("employer");
    let jobId = localStorage.getItem("JobId");
    console.log("jobid in view is",jobId)
    this.jobService.jobDetails(jobId).subscribe((data:any)=>{
      this.viewJob = JSON.parse(JSON.stringify(data));
            
      for (let i=0;i<this.viewJob.skills.length;i++){
        this.skills.push(this.viewJob.skills[i].item_text)
      }
      // Concatenating elements of array into a string separated by comma
      this.skillsList = this.skills.join()
      console.log("skis",this.skillsList )
            
    })
    console.log("viewJob",this.viewJob);
  }
  // editProf(){
  //   console.log("In editProf")
  //   this.empService.EdProf(this.EmpProf);
  //   // localStorage.removeItem("EmpId")
  //   // To be removed when logging out
  //   alert("success");
  //   this.router.navigate(['/employer/dashboard'])

  // }
  back(){
    this.router.navigate(['employer/job-list']);
  }
  editJob(){
    this.router.navigate(['employer/job-update']);
   }
   shortlistApp(){
    this.router.navigate(['/employer/job-shortlist']);

}
}
