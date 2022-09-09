import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmnEmployerService {

  server_address: string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  getEmployers(){
    return this.http.get(`${this.server_address}/admin/employerlist`);
  }

  getEmplcount(){
    return this.http.get(`${this.server_address}/admin/employercount`);
  }

  getActiveEmpl(){
    return this.http.get(`${this.server_address}/admin/activeemployers`);
  }

  getStudcount(){
    return this.http.get(`${this.server_address}/admin/studentcount`);
  }

  getJobscount(){
    return this.http.get(`${this.server_address}/admin/jobscount`);
  }

  setEmpProfile(empid:any){
    return this.http.get(`${this.server_address}/admin/employerview/`+empid);
  }

  previewJob(jobid:any){
    //alert(jobid);
    return this.http.get(`${this.server_address}/admin/jobpreview/`+jobid);
  }

  updateEmployer(emplinfo:any){
    //alert(emplinfo.companyInfo);
    return this.http.put(`${this.server_address}/admin/updateemplinfo`,emplinfo)
    .subscribe(data =>{console.log(data)})
  }

  deleteEmployer(empremid:any){
   //alert('in service');
   return this.http.delete(`${this.server_address}/admin/employerdel/`+empremid);        
  }

  resetEmployer(emprefid:any,empstat:any){
    //alert('in service'+empstat);
    return this.http.put(`${this.server_address}/admin/employerreset`,{empid:emprefid, statset:empstat});  
    //return("test");
   }

   newEmps(addemp: any) {
    console.log("addemp", addemp)
    return this.http.post<any>(`${this.server_address}/admin/createemployer`, { "employer": addemp });     
  };

  setEmpJoblist(empid:any){
    return this.http.get(`${this.server_address}/admin/employerjoblist/`+empid);
  }

  setFullJoblist(){
    return this.http.get(`${this.server_address}/admin/joblistings`);
  }

  setApplicantsList(jobid:any){
    return this.http.get(`${this.server_address}/admin/jobapplications/`+jobid);
  }

  setApplicantData(studarray:any){
    return this.http.post(`${this.server_address}/admin/applnpreview`, { "ids": studarray });    
  }

  showApplicant(studid:any){
    return this.http.get(`${this.server_address}/admin/showapplicant/`+studid);
  }

  deleteJob(jobid:any){
    //alert('in service');
    return this.http.delete(`${this.server_address}/admin/jobdel/`+jobid);        
   }

}
