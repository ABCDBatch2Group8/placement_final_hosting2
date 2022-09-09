import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { Router } from '@angular/router';
import { studModel } from '../stud-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { saveAs } from 'file-saver'
import { HeaderService } from '../header.service';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stud-profilepage',
  templateUrl: './stud-profilepage.component.html',
  styleUrls: ['./stud-profilepage.component.css'],
})
export class StudProfilepageComponent implements OnInit {
  file!: File;
  // data!:File;
  data! : String;
  download: Boolean = false;
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
  // link:string ="";
  selItems: Array<object> = [];

  attachment :any =[];

  Signin = new studModel('', '', '', '', '', '', '', '', '', []);

  Course = [
    {
      course: '',
      category: '',
    },
  ];

  constructor(private router: Router, private _auth: StudAuthService,private headservice : HeaderService) {}

  dropdownList: Array<Object> = [];
  selectedItems: Array<object> = [];

  dropdownSettings: IDropdownSettings = {};

  ngOnInit(): void {
    this.headservice.setMenu("student");
    this._auth.getSkill().subscribe((res: any) => {
      this.dropdownList = JSON.parse(JSON.stringify(res));
    });

    console.log('dropdown is', this.dropdownList);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // limitSelection: 5,
      allowSearchFilter: true,
    };

    this._auth.course().subscribe((data: any) => {
      this.Course = JSON.parse(JSON.stringify(data));
      console.log(data);
    });

    let Id = localStorage.getItem('stud-id');
    this._auth.stud_dashboard(Id).subscribe((data: any) => {
      this.Signin = JSON.parse(JSON.stringify(data));
      // console.log("selitems",this.selItems)
      // console.log("in stud-update profile p1")
      // console.log("every data in updateprofile page1",this.Signin)
    });
  }

  onChange(event: any) {
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

  editProf() {
    console.log(this.file);
    console.log('name of file=' + this.file.name);
    // console.log("selected items:",this.selectedItems)
    // this.selItems=this.selectedItems;
    this.Signin.skills = this.selectedItems;
    console.log('selitems', this.selItems);
    // let x=JSON.stringify( this.file.name);
    //  this.Signin.resume['x'];
    this._auth.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        //  this.shortLink=event.link;
        // this.loading=false;
        console.log( "file details:",event);
        // this.data=JSON.parse(JSON.stringify(event.originalname))
        // console.log("data",this.data) 
      }
    });

    console.log('In editProf');
    // let x=JSON.stringify( this.file.name);
    console.log('filename', this.file.name);
    this.Signin.resume = this.file.name;
    console.log('signin', this.Signin);

    this._auth.EditProfile(this.Signin);
    // localStorage.removeItem("EmpId")
    // To be removed when logging out
    // alert("success");
    this.router.navigate(['/student/updatepg2']);
  }

  down(event:any){
    this._auth.download(event).subscribe( (res:Blob | MediaSource)=> {
      console.log("the respon",res);
      let downloadUrl = window.URL.createObjectURL(res);
      // save as file 
      saveAs(downloadUrl)
    })

  }
}
