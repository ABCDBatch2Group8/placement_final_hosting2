import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnEmployerService } from '../admn-employer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admn-employer',
  templateUrl: './admn-employer.component.html',
  styleUrls: ['./admn-employer.component.css']
})
export class AdmnEmployerComponent implements OnInit {

  title = 'Employers';
 
  dtOptions: DataTables.Settings = {};
  posts: any;

  displayStyle = "none";
  statsetStyle = "none";
  statusLabel = "";
  removerreferer:any;

  statsetreferer:any;
  statsetval = "";

  delstat:any;

  constructor(private http: HttpClient, public admnemployer : AdmnEmployerService, private route : Router) { 


    this.admnemployer.getEmployers()
    .subscribe(posts => {
        //this.posts = posts;
        this.posts = JSON.parse(JSON.stringify(posts));
    }, error => console.error(error));
    
  }  

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    
  }

  viewEmployer(employer:any){
    //alert(employer._id);
    localStorage.setItem('editEmployerId',employer._id.toString());
    this.route.navigate(['admin/empsettings']);
  }

  delEmprecord(employer:any){
    this.removerreferer = employer._id;
    this.displayStyle = "block";      
  }

  setstatEmployer(employer:any,curstat:any){
   if(curstat=='N'){
    this.statusLabel = "Disable";
    this.statsetval = 'Y';
   }
   else{
    this.statusLabel = "Activate";
    this.statsetval = 'N';
   }

   this.statsetreferer = employer._id;
    
    this.statsetStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";    
  }

  closeStatpop() {
    this.statsetStyle = "none";    
  }
  
  resetEmpStat(empstatid:any,setstat:any){
    //alert(setstat); resetEmployer
    this.admnemployer.resetEmployer(empstatid,setstat).subscribe((data)=>{
     this.posts = JSON.parse(JSON.stringify(data));                  
    }) 
    this.statsetStyle= "none"; 
  }
  
  
  processdelete(empremid:any){
    //alert(empremid); 
    this.admnemployer.deleteEmployer(empremid).subscribe((data)=>{
      this.posts = JSON.parse(JSON.stringify(data));                  
    }) 
    this.displayStyle = "none";    
  }  

}
