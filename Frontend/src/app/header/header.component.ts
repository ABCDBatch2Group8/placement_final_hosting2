import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navmenu = '';


  constructor( private headservice : HeaderService) { }

  ngOnInit(): void {    
    
    this.headservice.navmenu.subscribe(navmenu => {
      this.navmenu = navmenu;
    });
          
  }

}
