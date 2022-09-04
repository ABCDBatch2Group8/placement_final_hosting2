import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { Router } from '@angular/router';
import { studModel } from '../stud-model';

@Component({
  selector: 'app-stud-profilepage',
  templateUrl: './stud-profilepage.component.html',
  styleUrls: ['./stud-profilepage.component.css']
})
export class StudProfilepageComponent implements OnInit {
  
  file!:File;
  // Signin={
  //   name : '', 
  //   email: '', 
  //   dwmsid : '',
  //   contactNo :'',
  //   courseInICT : '',
  //   qualification :'', 
  //   stream :'',
  //   password:''
  // };
  Signin= new studModel('','','', '','','','','','');

  Course=[{
    course :'',
    category:''
  }]

  constructor(private router:Router,private _auth:StudAuthService) { }

  ngOnInit(): void {
    this._auth.course().subscribe((data:any)=>{
      this.Course=JSON.parse(JSON.stringify(data));
      console.log(data)
  })

    let Id = localStorage.getItem("stud-id");
    this._auth.stud_dashboard(Id).subscribe((data:any)=>{
      this.Signin = JSON.parse(JSON.stringify(data));
      console.log("hai")
      console.log(this.Signin)
     

    })
  }
  onChange(event:any){
    // if(event.file.length.length>0){
      this.file = event.target.files[0];
    // }
    // let obi={resume:this.file.name}
    // Object.assign(this.Signin,obi)
    //  (this.Signin.resume)=this.file.name;
  }
  // onUpload(){
  //   // this.loading = !this.loading;
  //   console.log(this.file);
  //   console.log("name of file="+this.file.name);
  //   // let x=JSON.stringify( this.file.name);
  //   //  this.Signin.resume['x'];
  //   this._auth.upload(this.file).subscribe((event:any)=>{
  //     if(typeof(event)==='object'){
  //       // this.shortLink=event.link;
  //       // this.loading=false;
  //       console.log("in stud-profile:  the type of event is object")
  //     }
  //   });
  // }

  editProf(){
    console.log(this.file);
    console.log("name of file="+this.file.name);
    // let x=JSON.stringify( this.file.name);
    //  this.Signin.resume['x'];
    this._auth.upload(this.file).subscribe((event:any)=>{
      if(typeof(event)==='object'){
        // this.shortLink=event.link;
        // this.loading=false;
        console.log("in stud-profile:  the type of event is object")
      }
    });

    console.log("In editProf")
    // let x=JSON.stringify( this.file.name);
    console.log('filename', this.file.name);
    this.Signin.resume = this.file.name;
    console.log('signin', this.Signin);
    
    this._auth.EditProfile(this.Signin);
    // localStorage.removeItem("EmpId")
    // To be removed when logging out
    // alert("success");
     this.router.navigate(['/student/updatepg2'])

  }

}