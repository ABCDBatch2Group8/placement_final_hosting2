import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import Swal from 'sweetalert2'
export class Offers{
  constructor(
      public company: String,
      public jobid:string,
      public designation: String,
      public offer_date: String,
      public ctc_per_annum: String
  ){}
}

@Component({
  selector: 'app-admn-studprofile',
  templateUrl: './admn-studprofile.component.html',
  styleUrls: ['./admn-studprofile.component.css']
})
export class AdmnStudprofileComponent implements OnInit {
  jobs =[ {
    _id:'',
    // name:"",
    company:"",
    position:"",
    jd_text:"",
    numbers:'',
    salary: "",
    location:"",
    start_date:'',
    end_date:'',
    experience:'',
    applicants:[{
      
    stud_ref:'',
      shortlist_status:false,
      application_status:''
    }]
  }]
  servermessage="";
  selectmessage="";

  offers:Offers[]=[];
  studentView:any;
  offerView:any;
  title = 'Employers';
  emp:any;
  studid:any;

  offer={
    company:'',
    jobid:'',
     designation:'',
     offer_date:'',
     ctc_per_annum:''
  }
     company!: String
     jobid!:String
     designation!: String
     offer_date!: String
     ctc_per_annum!: String
  
     
  
  constructor(
    private http:HttpClient,
    private admn:AdmnAuthService,
    private router:Router,
    private headservice : HeaderService
  ) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
     this.studid=localStorage.getItem('candidateID');
    this.admn.getCandidate(this.studid).subscribe((data)=>{
      this.studentView=JSON.parse(JSON.stringify(data));

      this.admn.getEmployers().subscribe(data=>{
        this.emp=JSON.parse(JSON.stringify(data))
      })
    })
  }
  
  AddOffer(){
   const submitedoffer={
      dwmsid:this.studentView.dwmsid,
      email:this.studentView.email,
      batch:this.studentView.courseInICTAK,
      name:this.studentView.name,
      jobid:this.offer.jobid,
      company:this.offer.company,
      designation:this.offer.designation,
      offer_date:this.offer.offer_date,
      ctc_per_annum:this.offer.ctc_per_annum
    }
    if(submitedoffer.company=='Select a Company'){


      this.selectmessage="Please select title of company"
    }
    else{
      alert(submitedoffer.company)
      
      this.admn.newOffer(submitedoffer).subscribe(res=>{
        let data=JSON.parse(JSON.stringify(res));
        if(JSON.parse(JSON.stringify(data.status)) ==="succes")
        {
          Swal.fire({
            toast: true,
            color: 'green',
            background: 'white',
            icon: 'success',
            title: 'Offer send Successfully.',
            position: 'center',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mousecenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
        }
        else{
          this.servermessage=JSON.parse( JSON.stringify(data.message)) ;
        }

    })
    
    }
      
    }

}
