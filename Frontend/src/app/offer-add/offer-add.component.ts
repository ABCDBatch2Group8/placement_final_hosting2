import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferModel } from '../offer.model';
import { OfferService } from '../offer.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css']
})
export class OfferAddComponent implements OnInit {
  title: String = "Please Register!";
  addOffer = new OfferModel('','','','','','','','','');

  constructor(private headservice : HeaderService,private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("employer");
  }
  AddOffer(){
  this.offerService.newOffer(this.addOffer);
    this.router.navigate(['employer/dashboard']);
    Swal.fire({
      toast: true,
      color: 'green',
      background: 'grey',
      icon: 'success',
      title: 'Successfully registered. Please login!',
      position: 'center-left',
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mousecenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }


}
