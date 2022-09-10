import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import { count } from 'rxjs';
export class Student{
  constructor(
    public firstname:string,
    public lastname:string,
    public email:string
  ){}
}
@Component({
  selector: 'app-admn-students',
  templateUrl: './admn-students.component.html',
  styleUrls: ['./admn-students.component.css']
})
export class AdmnStudentsComponent implements OnInit {
students:Student[]=[];
displayStyle = "none";
showform="none";
ref:any;
num:any;
server_address: string = 'http://localhost:3000';
student={
  firstname:'',
  lastname:'',
  email:''
}
firstname!:string
lastname!:string
email!:string
  
  constructor(
    private http:HttpClient,
    private admn:AdmnAuthService,
    private router:Router,
    private headservice : HeaderService
    ) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
    this.getStudents();
  }
  getStudents(){
    this.http.get<any>(`${this.server_address}/admin/students`).subscribe(
      response=>{
        this.students=response;
        console.log(response)
      }
    )
    }
    newStudent(){
      const newstud={
        firstname:this.student.firstname,
        lastname:this.student.lastname,
        email:this.student.email
      }
        this.admn.newStudent(newstud)
        this.router.navigate(['admin/ictakstudents'])
        .then(() => {
                window.location.reload();
                });
      }
    
    getId(stud:any){
      this.ref=stud._id;
      this.displayStyle = "block";
    }
    toDelete(){
      this.admn.deleteStudent(this.ref).subscribe((data)=>{
        this.student=JSON.parse(JSON.stringify(data))
        this.displayStyle = "none";
         this.router.navigate(['admin/ictakstudents'])
        .then(() => {
          window.location.reload();
        });
      })
}
closePopup() {
  this.displayStyle = "none";    
}
}
