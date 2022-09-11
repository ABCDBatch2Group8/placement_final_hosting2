import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { getCurrencySymbol } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  server_address: string = 'http://localhost:3000';
  

  constructor(private http: HttpClient) { }

  newEmps(addemp: any) {
    console.log("addemp", addemp)
    return this.http.post<any>(`${this.server_address}/employer/signup`, { "employer": addemp })
      .subscribe(
        res => {
            Swal.fire({
            toast: true,
            color: 'green',
            background: 'grey',
            icon: res.status,
            title: res.message,
            position: 'center-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mousecenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }

          })
          // alert(res.message)
        
          })
};

employerLogin(user:any){
  console.log("user in service",user)
  return this.http.post<any>(`${this.server_address}/employer/login`,{"employer": user})
}

empProf(id:any){
  return this.http.get<any>(`${this.server_address}/employer/profile/`+id)
}

EdProf(emp:any){
  console.log("Profile update");
    return this.http.put<any>(`${this.server_address}/employer/profile/update/`,emp)
}

loggedIn(){
  return !!localStorage.getItem('empToken')
}
getToken(){
  return localStorage.getItem('empToken');
}

}



