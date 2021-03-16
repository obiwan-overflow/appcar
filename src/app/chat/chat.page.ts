import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  listcontact:any;
  facebook:any;
  mail:any;
  line:any;
  image:any;
  address:any;
  constructor(public api: RestApiService) {
    this.api.getdata('information/getContact').subscribe(res => {
      this.listcontact = res;
      // console.log(this.listcontact);
      this.facebook = this.listcontact.facebook;
      this.mail = this.listcontact.mail;
      this.line = this.listcontact.line;
      this.image = this.listcontact.image;
      this.address = this.listcontact.address;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
