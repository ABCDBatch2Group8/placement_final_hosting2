import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from '../job.model';
import { JobService } from '../job.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SkillService } from '../skill.service';
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent implements OnInit {
  selItems: Array<object> = [];
  viewJob = new JobModel('','','','','','','',this.selItems,'',null!,null!);
  constructor(private headservice : HeaderService,private jobService: JobService, private skillService: SkillService, private router: Router) { }
  dropdownList: Array<Object> = [];
  selectedItems: Array<object> = [];
  
  dropdownSettings:IDropdownSettings={};
  ngOnInit(): void {

    this.headservice.setMenu("employer");

    let jobId = localStorage.getItem("JobId");
    this.jobService.jobDetails(jobId).subscribe((data:any)=>{
      this.viewJob = JSON.parse(JSON.stringify(data));
    })
    // Getting skills for the dropdown from the skills collection
    this.skillService.getSkill()
        .subscribe(
          (res:any) =>{
            this.dropdownList =JSON.parse(JSON.stringify(res));
          });
          

    console.log("dropdown is",this.dropdownList);
    
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // limitSelection: 5,
      allowSearchFilter: true
    };
       
  }
  cancel(){
    this.router.navigate(['employer/job-view']);
  }
        editJob(){
//     // this.addJob.emp_ref = localStorage.getItem('EmpId');
//     this.addJob.emp_ref = localStorage.getItem('EmpId');
//     this.addJob.company = localStorage.getItem('EmpComp')
//     this.addJob.skills = this.selectedItems;
//     console.log ("To insert in job",this.addJob)
//     console.log("selitems",this.selItems)
//     this.jobService.newJobs(this.addJob)
//     // .subscribe(
//     //   (res:any) => {  
//     //     alert("res.message")
//     //   })
//     this.router.navigate(['employer/dashboard']);
//     alert ("success")
    }
}
