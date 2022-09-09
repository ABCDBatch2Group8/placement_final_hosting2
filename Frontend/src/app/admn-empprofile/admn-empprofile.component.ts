import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnEmployerService } from '../admn-employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admn-empprofile',
  templateUrl: './admn-empprofile.component.html',
  styleUrls: ['./admn-empprofile.component.css']
})
export class AdmnEmpprofileComponent implements OnInit {

  employerview:any;
  employeredit:any;
  jobslist : any;
  jobprofile : any;

  pvjobtitle  = '';
  pvjobcompany = '';
  pvjobjd = '';
  pvjobopening = '';
  pvjobsalary = '';
  pvjobskills:any;
  pvjoblocation = '';
  pvjobsdate = '';
  pvjobedate = '';

  phoneinvalid:any;
  gstinvalid:any;
  frmerrorview:any;

  displayStyle = "none";
  emptyJoblist  = "";
  previewStyle = "none";

  jobdelStyle = "none";
  removerreferer:any;

  constructor(private http: HttpClient, private admnemployer : AdmnEmployerService, private route : Router) { }

  ngOnInit(): void {

    let empid = localStorage.getItem('editEmployerId');   
    //let empid = localStorage.getItem('EmpId');    
    this.admnemployer.setEmpProfile(empid).subscribe((data)=>{
    this.employerview=JSON.parse(JSON.stringify(data));
    this.employeredit = JSON.parse(JSON.stringify(data));
    //localStorage.removeItem('editEmployerId')            
    })
    //Set employers Jobs list
    this.admnemployer.setEmpJoblist(empid).subscribe((jobdata)=>{
      if(jobdata==""){
        this.emptyJoblist = "No Jobs found posted";
      }
      this.jobslist=JSON.parse(JSON.stringify(jobdata));                 
      })
  }  

  updateEmployer(){
    //alert(this.employeredit._id); 
    this.phoneinvalid =''; 
    this.gstinvalid ='';
    this.frmerrorview = '';
    var permit = 1;

    var regPhone= /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
    var regGst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if(!regPhone.test(this.employeredit.phone)){      
      this.phoneinvalid = "Invalid Phone No"; 
      permit = 0;         
    }

    if(!regGst.test(this.employeredit.gstin)){      
      this.gstinvalid = "Invalid GST No";
      permit = 0;           
    }

    if(permit==0){
      this.frmerrorview = "* Mandatory fields missing or invalid";
    }
    else{
      this.admnemployer.updateEmployer(this.employeredit);
      this.displayStyle = "block";       
    }

  }

  listApplications(jobid:any){    
    this.route.navigate(['admin/applications',jobid]);
  }

  previewJob(jobid:any){
    this.admnemployer.previewJob(jobid).subscribe((jobinfo)=>{
      this.jobprofile = JSON.parse(JSON.stringify(jobinfo)); 
      this.pvjobtitle = this.jobprofile.position; 
      this.pvjobcompany = this.jobprofile.company; 
      this.pvjobopening = this.jobprofile.number; 
      this.pvjobsdate = this.jobprofile.start_date;
      this.pvjobedate = this.jobprofile.end_date; 
      this.pvjoblocation = this.jobprofile.location; 
      this.pvjobsalary = this.jobprofile.salary; 
      this.pvjobjd = this.jobprofile.jd_text; 
      this.pvjobskills = this.jobprofile.skills;     
    })
    this.previewStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
    this.route.navigate(['admin/employer']);
  }

  closePreview() {
    this.previewStyle = "none";    
  }

  delJobrecord(jobid:any){
    this.removerreferer = jobid;
    this.jobdelStyle = "block";      
  }

  closeDelup() {
    this.jobdelStyle = "none";    
  }

  processdelete(jobid:any){
    //alert(jobid); 
    this.admnemployer.deleteJob(jobid).subscribe((jobdata:any)=>{
    if(jobdata==""){
    this.emptyJoblist = "No Jobs found posted";
    }
    this.jobslist=JSON.parse(JSON.stringify(jobdata));                  
    }) 
    this.jobdelStyle = "none"; 
    //Reset Page
    let empid = localStorage.getItem('editEmployerId');   
    //let empid = localStorage.getItem('EmpId');    
    this.admnemployer.setEmpProfile(empid).subscribe((data)=>{
    this.employerview=JSON.parse(JSON.stringify(data));
    this.employeredit = JSON.parse(JSON.stringify(data));
    //localStorage.removeItem('editEmployerId')            
    })
    //Set employers Jobs list
    this.admnemployer.setEmpJoblist(empid).subscribe((jobdata)=>{
      if(jobdata==""){
        this.emptyJoblist = "No Jobs found posted";
      }
      this.jobslist=JSON.parse(JSON.stringify(jobdata));                 
      })
    

    this.route.navigate(['admin/empsettings']);  
  } 

}
