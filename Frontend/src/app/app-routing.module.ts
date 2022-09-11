import { NgModule } from '@angular/core';
import { RouterModule, Routes} from  '@angular/router';
import { AdmnAuthGuard } from './admn-auth.guard';
import { EmpAuthGuard } from './emp-auth.guard';

// import {  } from "@angular/";
import { AdminComponent } from './admin/admin.component';
import { AdmnCandidatesComponent } from './admn-candidates/admn-candidates.component';
import { AdmnCourseComponent } from './admn-course/admn-course.component';
import { AdmnDashboardComponent } from './admn-dashboard/admn-dashboard.component';
import { AdmnEmployerComponent } from './admn-employer/admn-employer.component';
import { AdmnEmpprofileComponent } from './admn-empprofile/admn-empprofile.component';
import { AdmnLoginComponent } from './admn-login/admn-login.component';
import { AdmnStudentsComponent } from './admn-students/admn-students.component';
import { AdmnSubadmnComponent } from './admn-subadmn/admn-subadmn.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { EmployerComponent } from './employer/employer.component';
import { LandingComponent } from './landing/landing.component';
import { StudLoginComponent } from './stud-login/stud-login.component';
import { StudSignupComponent } from './stud-signup/stud-signup.component';
import { StudentComponent } from './student/student.component';

import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { JobPostComponent } from './job-post/job-post.component';
import { StudJoblistComponent } from './stud-joblist/stud-joblist.component';
import { StudContactUspageComponent } from './stud-contact-uspage/stud-contact-uspage.component';
import { StudProfilepageComponent } from './stud-profilepage/stud-profilepage.component';
import { StudSettingspageComponent } from './stud-settingspage/stud-settingspage.component';
import { StudFormP2Component } from './stud-form-p2/stud-form-p2.component';
import { AdmnResetComponent } from './admn-reset/admn-reset.component';
import { AdmnListComponent } from './admn-list/admn-list.component';
import { StudApplyComponent } from './stud-apply/stud-apply.component';
import { StudHomeComponent } from './stud-home/stud-home.component';
import { StudJobhistoryComponent } from './stud-jobhistory/stud-jobhistory.component';
import { AdmnAddemployerComponent } from './admn-addemployer/admn-addemployer.component';
import { AdmnJobsComponent } from './admn-jobs/admn-jobs.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobViewComponent } from './job-view/job-view.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobShortlistComponent } from './job-shortlist/job-shortlist.component';
import { OfferAddComponent } from './offer-add/offer-add.component';

import { AdmnStudprofileComponent } from './admn-studprofile/admn-studprofile.component';
import { AdmnChildGuard } from './admn-child.guard';
import { AdmnJobapplicationsComponent } from './admn-jobapplications/admn-jobapplications.component';
import { JobApplnStatusComponent } from './job-appln-status/job-appln-status.component';
import { LogoutComponent } from './logout/logout.component';
import { StudGuard } from './stud.guard';




const routes: Routes = [
  {path : "", component : LandingComponent},
  {path : "employer", component : EmployerComponent,
  children : [
    {path : "", component : EmpLoginComponent},
    {path : "login", component : EmpLoginComponent},
    {path : "signup", component : EmpSignupComponent},
    {path : "dashboard",canActivate:[EmpAuthGuard], component: EmpDashboardComponent},
    {path : "profile", canActivate:[EmpAuthGuard], component: EmpProfileComponent},
    {path : "job-post", canActivate:[EmpAuthGuard], component: JobPostComponent },
    {path : "job-list", canActivate:[EmpAuthGuard], component: JobListComponent },
    {path : "job-view", canActivate:[EmpAuthGuard], component: JobViewComponent },
    {path : "job-update", canActivate:[EmpAuthGuard], component: JobUpdateComponent },
    {path : "job-shortlist", canActivate:[EmpAuthGuard], component: JobShortlistComponent },
    {path : "offer-add", canActivate:[EmpAuthGuard], component: OfferAddComponent },
    {path : "appln-status", canActivate:[EmpAuthGuard], component: JobApplnStatusComponent }
    
  ]
  },
  {path : "student", component : StudentComponent,
  children : [
    {path : "", component : StudLoginComponent},
    {path : "login", component : StudLoginComponent},
    {path : "signup", component : StudSignupComponent},
    {path : "job", canActivate:[StudGuard], component :StudJoblistComponent},
    {path : "contact",canActivate:[StudGuard], component :StudContactUspageComponent},
    {path : "profile", canActivate:[StudGuard],component :StudProfilepageComponent},
    {path : "settings", canActivate:[StudGuard],component :StudSettingspageComponent},
    {path : "updatepg2",canActivate:[StudGuard], component :StudFormP2Component},
    {path : "apply",canActivate:[StudGuard], component :StudApplyComponent},
    {path : "home", canActivate:[StudGuard],component : StudHomeComponent},
    {path : "history",canActivate:[StudGuard], component : StudJobhistoryComponent}
  
  ]
  },
  {path : "admin", canActivate:[AdmnAuthGuard],
  children:[
    {path:'',component:AdmnLoginComponent},
    {path:'',canActivateChild:[AdmnChildGuard],
    children:[
    {path : "", component : AdmnLoginComponent},
    {path : "dashboard", component : AdmnDashboardComponent},
    {path : "courses",component:AdmnCourseComponent},
    {path : "subadmin",component:AdmnSubadmnComponent},
    {path : "ictakstudents",component:AdmnStudentsComponent},
    {path : "employer",component : AdmnEmployerComponent},
    {path : "empsettings",component : AdmnEmpprofileComponent},
    {path : "candidates", component : AdmnCandidatesComponent},
    {path:  "reset", component : AdmnResetComponent},
    {path:  "adminlist",component : AdmnListComponent},
    {path : "addemployer", component : AdmnAddemployerComponent},
    {path : "joblist", component : AdmnJobsComponent},
    {path:"studentprofile",component:AdmnStudprofileComponent},
    {path : "applications/:id", component :AdmnJobapplicationsComponent},
    {path : "logout", component : LogoutComponent }
    ]
  }
]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
