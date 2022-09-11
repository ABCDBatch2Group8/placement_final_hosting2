import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class StudAuthService {
  server_address: string = 'http://localhost:3000';
  
  //    /api

  constructor(private http: HttpClient, private _router: Router) {}
  course() {
    return this.http.get(`${this.server_address}/student/signin`);
  }
  Signin(item: any) {
    // return this.http.post("http://localhost:3000/users/signin",{"users":item})
    return this.http
      .post(`${this.server_address}/student/signin`, { data: item })
      .subscribe((data: any) => {
        console.log(data);
        let x = JSON.stringify(data);
        if (x.match(/Success/)) {
          Swal.fire({
            toast: true,
            color: 'green',
            background: 'yellow',
            icon: 'success',
            title: 'user registered successfully',
            position: 'center-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          this._router.navigate(['/student/login']);
        } else if (x.match(/Email/)) {
          Swal.fire({
            toast: true,
            color: 'red',
            background: '',
            icon: 'info',
            title: 'Email already registered',
            position: 'center-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          // alert("User Email already registered")
        } else if (x.match(/no/)) {
          Swal.fire({
            toast: true,
            color: 'red',
            background: 'yellow',
            icon: 'error',
            title: 'Email does not match',
            position: 'center-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          // alert("User Email already registered")
        } else {
          console.log('error');
        }
        // if(x==" User Email already registered"){
        //   this._router.navigate([''])
        // }
      });
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this.server_address}/student/login`, user);
    //  .subscribe((data) =>{console.log(data)})
  }
  getToken() {
    return localStorage.getItem('stud-token');
  }

  // for auth guard
  loggedIn() {
    return !!localStorage.getItem('stud-token');
  }
  stud_dashboard(id: any) {
    return this.http.get<any>(`${this.server_address}/student/dashboard/` + id);
  }

  EditProfile(stud: any) {
    console.log('Profile update');
    return this.http
      .put<any>(`${this.server_address}/student/dashboard/update`, stud)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  getSkill() {
    return this.http.get<any>(`${this.server_address}/student/skill`);
  }
  EditProfile2(stud: any) {
    console.log('Profile update');
    return this.http
      .put<any>(`${this.server_address}/student/dashboard/update2`, stud)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  joblist() {
    return this.http.get(`${this.server_address}/student/jobListing`);
  }
  job_applypage(id: any) {
    return this.http.get<any>(`${this.server_address}/student/job/` + id);
    // console.log
  }
  application(val: any) {
    console.log('in service');
    return this.http.put<any>(`${this.server_address}/student/applyjob`, val);
  }
  upload(file: any): Observable<any> {
    // create form data
    const formData = new FormData();
    formData.append('file', file); //there was file.name
    return this.http.post<any>(`${this.server_address}/student/file`, formData);
  }

  job_history(id: any) {
    return this.http.get<any>(`${this.server_address}/student/history/` + id);
    // console.log
  }
  download(name: any) {
    return this.http.get(`${this.server_address}/student/getfile/` + name, {
      responseType: 'blob',
    });
  }

  
 
}

