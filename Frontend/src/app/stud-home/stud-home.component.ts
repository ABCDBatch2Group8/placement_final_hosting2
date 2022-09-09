import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-home',
  templateUrl: './stud-home.component.html',
  styleUrls: ['./stud-home.component.css']
})
export class StudHomeComponent implements OnInit {
  stud = {
    name : '',
    stream:'',
    qualification:''
  }

  constructor(private _display: StudAuthService ,private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
    let id = localStorage.getItem('stud-id');
    this._display.stud_dashboard(id).subscribe((data) => {
      this.stud = JSON.parse(JSON.stringify(data));
      console.log(data);
    });

  }

}
