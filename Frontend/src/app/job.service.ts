import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  server_address: string = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  newJobs(addjob: any) {
    console.log("addemp", addjob)
    return this.http.post<any>(`${this.server_address}/job/jobpost`, { "Job": addjob })
    // .subscribe(res =>{
    //   console.log("res is", res);
    // })
    }
  getJobs(empref:any){
    return this.http.get<any>(`${this.server_address}/job/joblist/`+empref)
  }

  jobDetails(id:any){
    return this.http.get<any>(`${this.server_address}/job/jobview/`+id)
  }

  editJob(job:any){
    console.log("Job update");
    return this.http.put<any>(`${this.server_address}/job/edit/`,job)
    .subscribe(data => {console.log(data)})
  }
  
  year_shortlist(params:any){
    return this.http.get<any>(`${this.server_address}/job/sl/year`,{params})
  }
 
  skill_shortlist(params:any){
    return this.http.get<any>(`${this.server_address}/job/sl/skill`,{params})
  }

  course_shortlist(params:any){
    return this.http.get<any>(`${this.server_address}/job/sl/course`,{params})
  }

  ys_shortlist(params:any){
    return this.http.get<any>(`${this.server_address}/job/sl/ys`,{params})
  }

  sc_shortlist(params:any){
    return this.http.get<any>(`${this.server_address}/job/sl/sc`,{params})
  }

  cy_shortlist(params:any){
    console.log("service params",params)
    return this.http.get<any>(`${this.server_address}/job/sl/cy`,{params})
  }

  ysc_shortlist(params:any){
    return this.http.get<any>(`${this.server_address}/job/sl/ysc`,{params})
  }
  markAsShortlist(params:any){
    console.log("In service id ",params)
    return this.http.get<any>(`${this.server_address}/job/mark/sl`,{params})
  }

  getApplicants(params:any){
    return this.http.get<any>(`${this.server_address}/job/get/sl`,{params})
  }

}

