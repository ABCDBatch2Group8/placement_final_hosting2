import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-joblist',
  templateUrl: './stud-joblist.component.html',
  styleUrls: ['./stud-joblist.component.css'],
})
export class StudJoblistComponent implements OnInit {
  // jobs =[ {
  //   name:"TCS ion",
  //   position:"programmer",
  //   jd_text:"Need a full stack developer to work for an insurance client",
  //   numbers:5,
  //   salary: "3.2 - 4.8 LPA",
  //   location:"Mumbai",
  //   start_date:'1994-05-23',
  //   end_date:'1987-09-28',
  //   experience:'2-3yrs'
  // },{
  //   name:"TCS ion",
  //   position:"programmer",
  //   jd_text:"Need a full stack developer to work for an insurance client",
  //   numbers:5,
  //   salary: "3.2 - 4.8 LPA",
  //   location:"Mumbai",
  //   start_date:'1994-05-23',
  //   end_date:'1987-09-28',
  //   experience:'2-3yrs'
  // }];
  jobs = [
    {
      _id: '',
      // name:"",
      position: '',
      jd_text: '',
      numbers: '',
      salary: '',
      location: '',
      start_date: '',
      end_date: '',
      experience: '',
    },
  ];

  constructor(private jobservice: StudAuthService,private headservice : HeaderService) {}

  ngOnInit(): void {
    this.headservice.setMenu("student");
    this.jobservice.joblist().subscribe((data) => {
      this.jobs = JSON.parse(JSON.stringify(data));
      console.log(data);
    });
  }
  onClick(event: string) {
    localStorage.removeItem('job');
    console.log('in joblist' + event);
    localStorage.setItem('job', event);
    // this.jobservice.job_applyid(event);
    // localStorage.setItem('id',event);
  }
}
