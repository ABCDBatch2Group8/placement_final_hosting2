import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnCandidatesService } from '../admn-candidates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admn-candidates',
  templateUrl: './admn-candidates.component.html',
  styleUrls: ['./admn-candidates.component.css']
})
export class AdmnCandidatesComponent implements OnInit {

  title = 'Students / Candidates';
 
  dtOptions: DataTables.Settings = {};
  candidates: any;

  displayStyle = "none";
  removerreferer:any;

  delstat:any;

  constructor(private http : HttpClient, public admncandidate : AdmnCandidatesService, private route : Router) { 

    this.admncandidate.getStudents()
    .subscribe(posts => {
        //this.candidates = posts;
        this.candidates = JSON.parse(JSON.stringify(posts));
        
    }, error => console.error(error));
  } 
    

  ngOnInit(): void {

      
  }
  viewStudent(stud:any){
   
    localStorage.setItem('candidateID',stud._id.toString());
    
    this.route.navigate(['admin/studentprofile']);
  }

}
