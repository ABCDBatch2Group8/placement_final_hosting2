import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  server_address: string = '/api';

  constructor(private http: HttpClient) { }

  getSkill(){
    return this.http.get<any>(`${this.server_address}/skill/all`)
  }
}
