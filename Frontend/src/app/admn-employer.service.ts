import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmnEmployerService {

  constructor(private http : HttpClient) { }

  getEmployers(){
    return this.http.get("http://localhost:3000/admin/employerlist");
  }

  getEmplcount(){
    return this.http.get("http://localhost:3000/admin/employercount");
  }

  getActiveEmpl(){
    return this.http.get("http://localhost:3000/admin/activeemployers");
  }

  getStudcount(){
    return this.http.get("http://localhost:3000/admin/studentcount");
  }

  getJobscount(){
    return this.http.get("http://localhost:3000/admin/jobscount");
  }

  setEmpProfile(empid:any){
    return this.http.get("http://localhost:3000/admin/employerview/"+empid);
  }

  previewJob(jobid:any){
    //alert(jobid);
    return this.http.get("http://localhost:3000/admin/jobpreview/"+jobid);
  }

  updateEmployer(emplinfo:any){
    //alert(emplinfo.companyInfo);
    return this.http.put("http://localhost:3000/admin/updateemplinfo",emplinfo)
    .subscribe(data =>{console.log(data)})
  }

  deleteEmployer(empremid:any){
   //alert('in service');
   return this.http.delete("http://localhost:3000/admin/employerdel/"+empremid);        
  }

  resetEmployer(emprefid:any,empstat:any){
    //alert('in service'+empstat);
    return this.http.put("http://localhost:3000/admin/employerreset",{empid:emprefid, statset:empstat});  
    //return("test");
   }

   newEmps(addemp: any) {
    console.log("addemp", addemp)
    return this.http.post<any>("http://localhost:3000/admin/createemployer", { "employer": addemp });     
  };

  setEmpJoblist(empid:any){
    return this.http.get("http://localhost:3000/admin/employerjoblist/"+empid);
  }

  setFullJoblist(){
    return this.http.get("http://localhost:3000/admin/joblistings");
  }

}
