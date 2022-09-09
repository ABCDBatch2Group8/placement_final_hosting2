import { Component, OnInit } from '@angular/core';
import { AdmnEmployerService } from '../admn-employer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admn-jobapplications',
  templateUrl: './admn-jobapplications.component.html',
  styleUrls: ['./admn-jobapplications.component.css']
})
export class AdmnJobapplicationsComponent implements OnInit {

  jobrefid:any;
  jobinfo:any;
  applicants:any; 
  applnreflist= new Array;
  candidates:any;
  studprofile:any;

  studname ="";
  studcourse = "";
  studemail ="";
  studdwms =  "";
  studphone = "";
  studqual = "";
  studstream = "";
  studlocation = "";
  studcbreak = "";
  studpassout = "";
  studrelocate = "";
  studskills : any;

  errorApplnlist  = "";

  previewStyle = "none";

  constructor(private admnemployer : AdmnEmployerService, private actroute : ActivatedRoute, private route : Router) { }

  ngOnInit(): void {
    this.jobrefid = this.actroute.snapshot.paramMap.get('id');
    //alert(this.jobrefid);
    try 
    {
      this.admnemployer.previewJob(this.jobrefid).subscribe((applndata)=>{      
      this.jobinfo = JSON.parse(JSON.stringify(applndata));
      //alert(this.jobinfo.position);          
      
      this.admnemployer.setApplicantsList(this.jobrefid).subscribe((candidate)=>{
        this.candidates = JSON.parse(JSON.stringify(candidate));        
      })
      
      })

    }
    catch(error) {
        alert("not found");
        this.errorApplnlist = "Resources not matching";
    }
  }

  previewApplicant(studid:any){
    this.admnemployer.showApplicant(studid).subscribe((studinfo)=>{
      this.studprofile = JSON.parse(JSON.stringify(studinfo)); 
      this.studname = this.studprofile.name;
      this.studcourse = this.studprofile.courseInICTAK; 
      this.studemail = this.studprofile.email;
      this.studdwms = this.studprofile.dwmsid;
      this.studphone = this.studprofile.contactNo;
      this.studqual = this.studprofile.qualification;
      this.studstream = this.studprofile.stream;
      this.studlocation = this.studprofile.location;
      this.studcbreak = this.studprofile.careerBreak;
      this.studpassout = this.studprofile.YearOfPassout;
      this.studrelocate = this.studprofile.readyToRelocate;      
      this.studskills = this.studprofile.skills;     
    })

    this.previewStyle = "block";
  }

  closePreview() {
    this.previewStyle = "none";    
  }

}
