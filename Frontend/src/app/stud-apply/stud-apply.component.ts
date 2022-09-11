import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import Swal from 'sweetalert2';
import { HeaderService } from '../header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stud-apply',
  templateUrl: './stud-apply.component.html',
  styleUrls: ['./stud-apply.component.css'],
})
export class StudApplyComponent implements OnInit {
  
  jobs = {
    jobid: '',
    position: '',
    jd_text: '',
    numbers: '',
    salary: '',
    location: '',
    start_date: '',
    end_date: '',
    experience: '',
    company: '',
    skills: [{ item_text: '' }],
  };
  buttonDisabled: Boolean = false;
  constructor(private _apply: StudAuthService, private headservice : HeaderService,private router: Router) {}

  ngOnInit(): void {
    this.headservice.setMenu("student");
    let Id = localStorage.getItem('job');
    console.log('in stud-apply-comp' + Id);
    this._apply.job_applypage(Id).subscribe((data) => {
      this.jobs = JSON.parse(JSON.stringify(data));
      console.log(data);
    });

    let id2 = localStorage.getItem('stud-id');
    this._apply.job_history(id2).subscribe((data) => {
      let x = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < x.length; i++) {
        console.log('in stud-jobapply to change button component :', x[i]._id);
        if (x[i]._id == Id) {
          console.log('you have already applied ');
          this.buttonDisabled = true;
        }
      }
      // console.log("in stud-jobapply to change button component :",x)
    });
  }
  Click(event: string) {
    console.log('in apply' + event);
    let id: string | null = localStorage.getItem('stud-id');
    console.log(id);
    this.buttonDisabled = true;
    let val = { id, event };
    Swal.fire({
      toast: true,
      color: 'green',
      // background:'whit',
      icon: 'success',
      title: 'Applied successfully',
      position: 'center-right',
      showConfirmButton: false,
      timer: 3000,
      // timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    this._apply.application(val).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/student/home']);
  }
}
