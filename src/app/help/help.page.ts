import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  datahelp:any;
  detail:any;
  constructor(public api: RestApiService) {
    this.api.getdata('information/help').subscribe(
      res=>{
        this.datahelp = res;
        this.detail = this.datahelp.detail;
      },err=>{
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}
