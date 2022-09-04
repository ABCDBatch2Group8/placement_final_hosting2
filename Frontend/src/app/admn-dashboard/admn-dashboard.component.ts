import { Component, OnInit } from '@angular/core';
import { AdmnEmployerService } from '../admn-employer.service';

@Component({
  selector: 'app-admn-dashboard',
  templateUrl: './admn-dashboard.component.html',
  styleUrls: ['./admn-dashboard.component.css']
})
export class AdmnDashboardComponent implements OnInit {

  countEmployers : any;
  activeEmployers : any;
  studentCount : any;
  jobsCount : any;
  constructor(public admnemployer : AdmnEmployerService) { 

    this.admnemployer.getEmplcount()
    .subscribe(posts => {        
        this.countEmployers = JSON.parse(JSON.stringify(posts));
    }, error => console.error(error));

    this.admnemployer.getActiveEmpl()
    .subscribe(actempl => {        
        this.activeEmployers = JSON.parse(JSON.stringify(actempl));
    }, error => console.error(error));

    this.admnemployer.getStudcount()
    .subscribe(stdcnt => {        
        this.studentCount = JSON.parse(JSON.stringify(stdcnt));
    }, error => console.error(error));

    this.admnemployer.getJobscount()
    .subscribe(jobcnt => {        
        this.jobsCount = JSON.parse(JSON.stringify(jobcnt));
    }, error => console.error(error));

  }

  ngOnInit(): void {
  }

}
