import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  text:string;
  email:string;
  number:string;
  msg:string;
  subject:string;
  fname:string;
  lname:string;
  option:string;

  constructor() {
  }

  ngOnInit() {

  }
  formOnSubmit(form:NgForm){
    console.log(form.value);
  }

}
