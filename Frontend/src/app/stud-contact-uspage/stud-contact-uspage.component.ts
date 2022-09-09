import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-contact-uspage',
  templateUrl: './stud-contact-uspage.component.html',
  styleUrls: ['./stud-contact-uspage.component.css']
})
export class StudContactUspageComponent implements OnInit {

  constructor(private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
  }

}
