import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-job-appln-status',
  templateUrl: './job-appln-status.component.html',
  styleUrls: ['./job-appln-status.component.css']
})
export class JobApplnStatusComponent implements OnInit {

  
    "searchJobId": '' 
    empid = (localStorage.getItem('currentUser')!)
    // or can also use like this  empid = (localStorage.getItem || '')
    //
    shortlistData: Array<any> = [];
    upAppStatus: string = '';
  
  constructor(private headservice : HeaderService,private jobService: JobService, private router: Router) { }

  // readonly params = new HttpParams()
  // .set ("jobId", this.searchJobId)
  // .set ( "empid", this.empid)

  ngOnInit(): void {
    this.headservice.setMenu("employer");
  }
  getList(jobid:any){
    let empId = (localStorage.getItem("EmpId")!);

    let params = new HttpParams()
      .set("jobId", jobid)
      .set("empId",empId)

    console.log("empid is",empId)
    this.jobService.getApplicants(params).subscribe((data:any)=>{
    console.log(data);
    this.shortlistData = data;
    // alert(res.message);
    // this.router.navigate(['/employer/dashboard'])
  }
  )}
  markAppStatus(jobid:any){
    
  }

  public onOptionsSelected4(event: any) {
    const value1 = event.target.value;

    this.upAppStatus = value1;
    console.log("value1 is", value1);
  }

}
