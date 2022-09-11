import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmnCandidatesService {
  server_address: string = '/api';

  constructor(private http : HttpClient) { }

  getStudents(){
    return this.http.get(`${this.server_address}/admin/candidatelist`);
  }
}
