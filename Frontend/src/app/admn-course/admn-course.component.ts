import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdmnAuthService } from '../admn-auth.service';

export class Courses{
  constructor(
    public course:string,
    public category:string
  ){}
}

@Component({
  selector: 'app-admn-course',
  templateUrl: './admn-course.component.html',
  styleUrls: ['./admn-course.component.css']
})

export class AdmnCourseComponent implements OnInit {
displayStyle = "none";
showform="none";
courses:Courses[]=[];
ref:any;

Course={
  course:'',
  category:'',
  
}
course!:string
caegory!:string
  constructor(private http:HttpClient,
    private router:Router,
    private admn:AdmnAuthService) { }

  ngOnInit(): void {
    this.getCourses()
  }
getCourses(){
this.http.get<any>("http://localhost:3000/admin/showcourse").subscribe(
  response=>{
    this.courses=response;
    console.log(response)
  }
)
}
newCourse(){

  const newcourse={
    course:this.Course.course,
    category:this.Course.category,
    
  }
  this.admn.newCourse(newcourse);
  this.showform="none";
}
getId(crs:any){
this.ref=crs._id;
this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";    
}
toDelete(courseid:any){
  
  this.admn.deleteCourse(courseid).subscribe((data)=>{
    this.course=JSON.parse(JSON.stringify(data))
    this.displayStyle = "none"; 
    // this.courses=this.courses.filter(p=>p!=course);
    // this.router.navigate(['admin/dashboard'])
  })
  }
  popform()
  {
    this.showform="block";
  }
}