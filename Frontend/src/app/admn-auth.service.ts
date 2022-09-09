import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdmnAuthService {
  stud={
    firstname:'',
    lastname:'',
    email:''
  }

  constructor(private http:HttpClient) { }
  admnlogin(admin:any){
    return this.http.post('http://localhost:3000/admin/login',admin)
  }
  newAdmin(admin:any){
    
    return this.http.post('http://localhost:3000/admin/signup',admin)
    // .subscribe(data=>{
    //   console.log(data);
    // })
  }
  editAdmin(id:any,password:any){
    
    return this.http.put("http://localhost:3000/admin/reset/"+id,{password})
    .subscribe(data =>{console.log(data)})
  }
  statusAdmin(id:any,status:any)
  {
    alert(status)
    return this.http.put("http://localhost:3000/admin/status/"+id,{status})
    .subscribe(data =>{console.log(data)})
  }
  newStudent(stud:any){
    
    return this.http.post('http://localhost:3000/admin/addictkstudent',stud)
    .subscribe(data=>{
      
    })
  }
  newCourse(course:any){
    return this.http.post('http://localhost:3000/admin/course',course)
    .subscribe(data=>{
      console.log(data);
    })
  }
  courseList(){
   return this.http.get('http://localhost:3000/admin/showcourse')
  }
  getStudent(email:any){
    return this.http.get('http://localhost:3000/admin/student',email)
    .subscribe(data=>{
      console.log(data);
    })

  }
  deleteCourse(id:any){
    
    return this.http.delete("http://localhost:3000/admin/deletecourse/"+id)
  }
  deleteStudent(id:any){
    return this.http.delete("http://localhost:3000/admin/deletestudent/"+id)
  }
  countStudent(email:any){
    alert(email)
    return this.http.get("http://localhost:3000/admin/emailcount/"+email)
    .subscribe(result=>{
      alert(result)
    })
  }
  countAdmin(email:any){
    return this.http.get("http://localhost:3000/admin/admincount"+email)
  }
  getCandidate(id:any){
    return this.http.get("http://localhost:3000/admin/getcandidate/"+id)
  }


  newOffer(addoffer: any) {
   
    return this.http.post('http://localhost:3000/admin/offer',  addoffer)
          
}
getEmployers(){
  return this.http.get('http://localhost:3000/admin/employerlist')
}
getoffers(id:any){
  return this.http.get('http://localhost:3000/admin/getoffers'+id)
}
logedIN(){
  return !!localStorage.getItem('token')
}
gettoken()
{
  return localStorage.getItem('token');
}
}
