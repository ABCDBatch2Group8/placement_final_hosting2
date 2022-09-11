import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { Router } from '@angular/router';
import { studModel } from '../stud-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { saveAs } from 'file-saver';
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
  data!: String;
  download: Boolean = false;

  selItems: Array<object> = [];

  attachment: any = [];

  Signin = new studModel('', '', '', '', '', '', '', '', '', []);

  Course = [
    {
      course: '',
      category: '',
    },
  ];

  constructor(
    private router: Router,
    private _auth: StudAuthService,
    private headservice: HeaderService
  ) {}

  dropdownList: Array<Object> = [];
  selectedItems: Array<object> = [];

  dropdownSettings: IDropdownSettings = {};

  ngOnInit(): void {
    this.headservice.setMenu('student');
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
    });
  }

  onChange(event: any) {
    // if(event.file.length.length>0){
    this.file = event.target.files[0];
  }

  editProf() {
    if (typeof this.file == 'undefined' && this.Signin.resume.length < 3) {
      alert('upload a valid resume');
    } else if (typeof this.file !== 'undefined') {
      console.log(this.file);
      console.log('name of file=' + this.file.name);
      this._auth.upload(this.file).subscribe((event: any) => {
        if (typeof event === 'object') {
          console.log('file details:', event);
        }
      });

      console.log('In editProf');

      this.Signin.resume = this.file.name;
      console.log('signin', this.Signin);

      this.Signin.skills = this.selectedItems;
      console.log('selitems', this.selItems);
      this._auth.EditProfile(this.Signin);
      this.router.navigate(['/student/updatepg2']);
    } else {
      this.Signin.skills = this.selectedItems;
      console.log('selitems', this.selItems);
      this._auth.EditProfile(this.Signin);

      this.router.navigate(['/student/updatepg2']);
    }
  }

  down(event: any) {
    this._auth.download(event).subscribe((res: Blob | MediaSource) => {
      console.log('the respon', res);
      let downloadUrl = window.URL.createObjectURL(res);
      // save as file
      saveAs(downloadUrl);
    });
  }
}
