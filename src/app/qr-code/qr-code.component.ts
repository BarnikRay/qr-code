import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm,FormControl, Validators} from '@angular/forms';
import * as QRCode from 'qrcode';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})

export class QrCodeComponent implements OnInit {
  text: string = "https://qr-bar-creator.firebaseapp.com";
  url: string = null;
  email: string;
  number: string;
  body: string;
  sub: string;
  fname: string;
  lname: string;
  option: string;
  color: string = null;
  image: string = null;
  urlRegex = /^(http|https|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  mobileToggle=true;
  timestamp:number=null;

  @ViewChild(MatExpansionPanel) colorPicker;

  urlForm = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)])
  });

  textForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  smsForm = new FormGroup({
    body: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  emailForm = new FormGroup({
    sub: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required),
  });

  vcardForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor() {
    this.color = '#000000';
  }

  ngOnInit() {
    this.createQr();

  }

  createQr() {
    QRCode.toDataURL(this.text, {width: 190, color: {dark: this.color}})
      .then(url => {
        this.image = url;
        this.timestamp=new Date().getTime();
      })
      .catch(err => {
        console.error(err);
      });
  }

  formOnSubmit(form: NgForm) {
    for (const name in form.value) {
      this[name] = form.value[name];
    }
    switch (this.option) {
      case 'url':
        this.text = this.url;
        break;
      case 'email':
        this.text = encodeURI('mailto:' + this.email + '?subject=' + this.sub + '&body=' + this.body);
        break;
      case 'sms':
        this.text = encodeURI('sms:' + this.number + '?body=' + this.body);
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
    this.createQr();
  }

  toggleColorPicker() {
    this.colorPicker.close();
  }
}
