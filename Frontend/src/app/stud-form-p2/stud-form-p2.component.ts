import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-form-p2',
  templateUrl: './stud-form-p2.component.html',
  styleUrls: ['./stud-form-p2.component.css']
})
export class StudFormP2Component implements OnInit {
  Signin={
    courseStatus:'' ,
    ictMarks:Number,
    location:'',
    readyToRelocate:'',
    employmentStatus:'',
    careerBreak:'',
    educationMarks:{Mark10:Number,Mark12:Number , QualificationMark:Number },
    YearOfPassout:Number
  }
   // skill:{type:String}
    // non required groups below

    //  marks10th:{type:String},
    //  marks12th:{type:String},
    // graduation:{type:Array},                  //input year of graduation too
    // pg : {type:Array},                       //array
    // courseStatus:{type : String},             //done
    // ict_marks: {type:String},
   // location:{type : String},               //Ernakulam
   // readyToRelocate :{type : String},           //yes

   // employmentStatus : {type : String},//includes fresher better give as an array to include break duration
   // careerBreak : {type : String},
   // breakDuration : {type:Number}  (no need)

  constructor(private _auth:StudAuthService ,private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
  //   this._auth.course().subscribe((data)=>{
  //     // this.Course=JSON.parse(JSON.stringify(data));
  //     console.log(data)
  // })

    let Id = localStorage.getItem("stud-id");
    this._auth.stud_dashboard(Id).subscribe((data:any)=>{
      this.Signin = JSON.parse(JSON.stringify(data));
      console.log("inside form2")
      console.log(this.Signin.educationMarks.Mark10)
      
     

    })
  }
  editProf(){
    console.log("In editProf")
    console.log(this.Signin)
    this._auth.EditProfile2(this.Signin);
    // localStorage.removeItem("EmpId")
    // To be removed when logging out
    alert("success");
    // this.router.navigate(['/employer/dashboard'])

  }

}
