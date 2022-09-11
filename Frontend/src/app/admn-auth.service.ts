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
  server_address: string = '/api';

  constructor(private http:HttpClient) { }
  admnlogin(admin:any){
    return this.http.post(`${this.server_address}/admin/login`,admin)
  }
  newAdmin(admin:any){
    
    return this.http.post(`${this.server_address}/admin/signup`,admin)
    // .subscribe(data=>{
    //   console.log(data);
    // })
  }
  editAdmin(id:any,password:any){
    
    return this.http.put(`${this.server_address}/admin/reset/`+id,{password})
    .subscribe(data =>{console.log(data)})
  }
  statusAdmin(id:any,status:any)
  {
    
    return this.http.put(`${this.server_address}/admin/status/`+id,{status})
    .subscribe(data =>{console.log(data)})
  }
  newStudent(stud:any){
    
    return this.http.post(`${this.server_address}/admin/addictkstudent`,stud)
    .subscribe(data=>{
      
    })
  }
  newCourse(course:any){
    return this.http.post(`${this.server_address}/admin/course`,course)
    .subscribe(data=>{
      console.log(data);
    })
  }
  courseList(){
   return this.http.get(`${this.server_address}/admin/showcourse`)
  }
  getStudent(email:any){
    return this.http.get(`${this.server_address}/admin/student`,email)
    .subscribe(data=>{
      console.log(data);
    })

  }
  deleteCourse(id:any){
    
    return this.http.delete(`${this.server_address}/admin/deletecourse/`+id)
  }
  deleteStudent(id:any){
    return this.http.delete(`${this.server_address}/admin/deletestudent/`+id)
  }
  countStudent(email:any){
    
    return this.http.get(`${this.server_address}/admin/emailcount/`+email)
    .subscribe(result=>{
      
    })
  }
  countAdmin(email:any){
    return this.http.get(`${this.server_address}/admin/admincount`+email)
  }
  getCandidate(id:any){
    return this.http.get(`${this.server_address}/admin/getcandidate/`+id)
  }


  newOffer(addoffer: any) {
   
    return this.http.post(`${this.server_address}/admin/offer`,  addoffer)
          
}
getEmployers(){
  return this.http.get(`${this.server_address}/admin/employerlist`)
}
getoffers(id:any){
  return this.http.get(`${this.server_address}/admin/history/`+id)
}
logedIN(){
  return !!localStorage.getItem('token')
}
gettoken()
{
  return localStorage.getItem('token');
}
}
