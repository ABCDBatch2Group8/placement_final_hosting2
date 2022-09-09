import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { FormBuilder, FormControl ,FormGroup, Validators} from '@angular/forms';
import { HeaderService } from '../header.service';



@Component({
  selector: 'app-stud-settingspage',
  templateUrl: './stud-settingspage.component.html',
  styleUrls: ['./stud-settingspage.component.css']
})
export class StudSettingspageComponent implements OnInit {

  // name = new FormControl('');

  Signin={
    password:'',
    cpswd:''
  };
  match: Boolean = false;
  constructor(private _password: StudAuthService ,private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
    let Id = localStorage.getItem('stud-id');
    this._password.stud_dashboard(Id).subscribe((data: any) => {
      this.Signin = JSON.parse(JSON.stringify(data));
      
    });
  }
editprof(){
  if(this.Signin.password==this.Signin.cpswd){
    this.match= true;
    this._password.EditProfile(this.Signin);
    
    // alert("succ")
  }
  else{
    // alert("error")
  }
 
}
}
