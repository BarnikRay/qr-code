import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  text: string = null;
  email: string;
  number: string;
  msg: string;
  subject: string;
  fname: string;
  lname: string;
  option: string;
  color: string = null;
  image: string = null;

  constructor() {
    this.color = '#000000';
  }

  ngOnInit() {

  }

  createQr() {
    QRCode.toDataURL(this.text, {width: 190, color: {dark: this.color}})
      .then(url => {
        this.image = url;
        console.log(url);
      })
      .catch(err => {
        console.error(err);
      });
  }

  formOnSubmit(form: NgForm) {
    for (const name in form.value) {
      this[name] = form.value[name];
    }
    this.createQr();

    console.log(this.text);
    console.log(this.color);
    switch (this.option) {
      case 'email':
        this.text = encodeURI('mailto:' + this.email + '?subject=' + this.subject + '&body=' + this.msg);
        break;
      case 'sms':
        this.text = encodeURI('sms:' + this.number + '?body=' + this.msg);
        break;
      case 'vcard':
        this.text = 'BEGIN:VCARD\n' +
          'VERSION:4.0\n' +
          'N:' + this.lname + ';' + this.fname + ';;\n' +
          'FN:' + this.fname + ' ' + this.lname + '\n' +
          'TEL;TYPE=work,voice;VALUE=uri:' + this.number + '\n' +
          'EMAIL:' + this.email + '\n' +
          'REV:20080424T195243Z\n' +
          'x-qq:21588891\n' +
          'END:VCARD';
    }
  }
}
