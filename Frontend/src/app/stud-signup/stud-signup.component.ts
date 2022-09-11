import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudAuthService } from '../stud-auth.service';
import { NgForm } from '@angular/forms';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-signup',
  templateUrl: './stud-signup.component.html',
  styleUrls: ['./stud-signup.component.css'],
})
export class StudSignupComponent implements OnInit {
  constructor(private auth: StudAuthService, private router: Router ,private headservice : HeaderService) {}
  Signin = {
    name: '',
    email: '',
    dwmsid: '',
    contactNo: '',
    courseInICT: '',
    qualification: '',
    stream: '',
    password: '',
  };

  Course = [
    {
      course: '',
      category: '',
    },
  ];

  ngOnInit(): void {
    this.headservice.setMenu("general");
    this.auth.course().subscribe((data: any) => {
      this.Course = JSON.parse(JSON.stringify(data));
      console.log(data);
    });
  }
  AddUser() {
    this.auth.Signin(this.Signin);
    console.log('Called');
    // alert("Success");
    // this.router.navigate(['student/login']);
  }
  // onSubmit(): void {
  //   console.log(JSON.stringify(this.form, null, 2));
  // }
  onReset(form: NgForm): void {
    form.reset();
  }
}
