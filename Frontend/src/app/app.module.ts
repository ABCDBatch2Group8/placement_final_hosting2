import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { EmployerComponent } from './employer/employer.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { StudentComponent } from './student/student.component';
import { StudLoginComponent } from './stud-login/stud-login.component';
import { StudSignupComponent } from './stud-signup/stud-signup.component';
import { AdminComponent } from './admin/admin.component';
import { AdmnDashboardComponent } from './admn-dashboard/admn-dashboard.component';
import { AdmnLoginComponent } from './admn-login/admn-login.component';
import { AdmnCourseComponent } from './admn-course/admn-course.component';
import { AdmnStudentsComponent } from './admn-students/admn-students.component';
import { AdmnSubadmnComponent } from './admn-subadmn/admn-subadmn.component';
import { AdmnMenuComponent } from './admn-menu/admn-menu.component';
import { DataTablesModule } from 'angular-datatables';
import { AdmnEmpprofileComponent } from './admn-empprofile/admn-empprofile.component';
import { AdmnCandidatesComponent } from './admn-candidates/admn-candidates.component';
import { AdmnEmployerComponent } from './admn-employer/admn-employer.component';
import { EmpService } from './emp.service';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JobService } from './job.service';
import { PasswordPatternDirective } from './password-pattern.directive';
import { StudAuthService } from './stud-auth.service';
import { StudJoblistComponent } from './stud-joblist/stud-joblist.component';
import { StudProfilepageComponent } from './stud-profilepage/stud-profilepage.component';
import { StudSettingspageComponent } from './stud-settingspage/stud-settingspage.component';
import { StudContactUspageComponent } from './stud-contact-uspage/stud-contact-uspage.component';
import { StudFormP2Component } from './stud-form-p2/stud-form-p2.component';
import { AdmnResetComponent } from './admn-reset/admn-reset.component';
import { AdmnListComponent } from './admn-list/admn-list.component';
import { StudApplyComponent } from './stud-apply/stud-apply.component';
import { StudHomeComponent } from './stud-home/stud-home.component';
import { StudJobhistoryComponent } from './stud-jobhistory/stud-jobhistory.component';
import { AdmnAddemployerComponent } from './admn-addemployer/admn-addemployer.component';
import { AdmnJobsComponent } from './admn-jobs/admn-jobs.component';


import { SkillService } from './skill.service';
import { JobListComponent } from './job-list/job-list.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobShortlistComponent } from './job-shortlist/job-shortlist.component';
import { JobViewComponent } from './job-view/job-view.component';
import { OfferAddComponent } from './offer-add/offer-add.component';
import { OfferService } from './offer.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    EmployerComponent,
    EmpLoginComponent,
    EmpSignupComponent,
    StudentComponent,
    StudLoginComponent,
    StudSignupComponent,
    AdminComponent,
    AdmnDashboardComponent,
    AdmnLoginComponent,
    AdmnCourseComponent,
    AdmnStudentsComponent,
    AdmnSubadmnComponent,
    AdmnMenuComponent,
    AdmnEmployerComponent,
    AdmnEmpprofileComponent,
    AdmnCandidatesComponent,
    PasswordPatternDirective,
    EmpDashboardComponent,
    EmpProfileComponent,
    JobPostComponent,
    StudJoblistComponent,
    StudProfilepageComponent,
    StudSettingspageComponent,
    StudContactUspageComponent,
    StudFormP2Component,
    AdmnResetComponent,
    AdmnListComponent,
    StudApplyComponent,
    StudHomeComponent,
    StudJobhistoryComponent,
    AdmnAddemployerComponent,
    AdmnJobsComponent,
    JobListComponent,
    JobUpdateComponent,
    JobShortlistComponent,
    JobViewComponent,
    OfferAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [EmpService,JobService,StudAuthService,SkillService,OfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
