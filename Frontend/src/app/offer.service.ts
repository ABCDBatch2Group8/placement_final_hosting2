import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  server_address: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  newOffer(addoffer: any) {
    console.log("addoffer", addoffer)
    return this.http.post<any>(`${this.server_address}/placement/add`, { "offer": addoffer })
      .subscribe(
        res => {
          // this.message = res.message 
          // this.EmpServerErr = res.EServErr
          // console.log("res.EServErr",res.EServErr);
          // console.log("res.message",res.message)

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

}
