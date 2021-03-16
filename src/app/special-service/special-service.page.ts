import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-special-service',
  templateUrl: './special-service.page.html',
  styleUrls: ['./special-service.page.scss'],
})
export class SpecialServicePage implements OnInit {
  listService:any;
  token:any;
  constructor(public api: RestApiService,private storage:Storage) {
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('profile/listCoinHistory&token='+this.token).subscribe(
        res=>{
          this.listService = res;
        },
        err=>{console.log(err);}
      );
    })
  }

  ngOnInit() {
  }

}
