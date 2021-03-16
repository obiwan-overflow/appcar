import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-promote',
  templateUrl: './promote.page.html',
  styleUrls: ['./promote.page.scss'],
})
export class PromotePage implements OnInit {
  car_id:any;
  status_promote:any;
  txtresult:any;
  txtdate:any;
  txtcoin:any;
  token:any;
  constructor(public api:RestApiService,public route:ActivatedRoute,private storage:Storage) {
    this.car_id = this.route.snapshot.paramMap.get('id');
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('announce/promoteCar&token='+this.token+'&id='+this.car_id).subscribe(
        res=>{
          console.log(res);
          this.status_promote = res;
          this.txtresult = this.status_promote.result;
          this.txtdate = this.status_promote.promote_expired;
          this.txtcoin = this.status_promote.coin;
        },err=>{
          console.log(err);
        }
      );
    });
  }

  ngOnInit() {
  }

}
