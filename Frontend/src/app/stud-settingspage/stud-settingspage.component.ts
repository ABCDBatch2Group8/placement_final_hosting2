import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { FormControl ,FormGroup, Validators,AbstractControl, FormBuilder} from '@angular/forms';
import { HeaderService } from '../header.service';
import { ConfirmedValidator } from '../stud-confirmed.validator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// import Validation from './utils/validation';



@Component({
  selector: 'app-stud-settingspage',
  templateUrl: './stud-settingspage.component.html',
  styleUrls: ['./stud-settingspage.component.css']
})
export class StudSettingspageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  // name = new FormControl('');

  Signin={
    password:'',
  };
  match: Boolean = false;
  constructor(private _password: StudAuthService ,private headservice : HeaderService,private formBuilder: FormBuilder,private _router: Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
     let Id = localStorage.getItem('stud-id');
     this._password.stud_dashboard(Id).subscribe((data: any) => {
       this.Signin = JSON.parse(JSON.stringify(data));
      
     });

    this.form = this.formBuilder.group(
      {
        // fullname: ['', Validators.required],
        // username: [
          // '',
          // [
            // Validators.required,
            // Validators.minLength(6),
            // Validators.maxLength(20)
          // ]
        // ],
        // email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
             Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
          ]
        ],
        confirmPassword: ['', Validators.required],
        // acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [ConfirmedValidator.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else{
      this._password.EditProfile(this.Signin);  
      Swal.fire({
        toast: true,
        color: 'green',
        background: 'yellow',
        icon: 'success',
        title: 'password reset successful',
        position: 'center-right',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      this._router.navigate(['/student/home']);
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
// editprof(){
//   if(this.Signin.password==this.Signin.cpswd){
//     this.match= true;
//     this._password.EditProfile(this.Signin);
    
//     // alert("succ")
//   }
//   else{
//     // alert("error")
//   }
 
}

