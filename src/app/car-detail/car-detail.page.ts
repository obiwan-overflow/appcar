import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
})
export class CarDetailPage implements OnInit {

  cardetail:any;
  car_id:any;
  price:any;
  image:any;
  detail:any;
  tel:any;
  line:any;
  brand:any;
  model:any;
  name:any;
  submodel:any;
  year:any;
  power:any;
  gear:any;
  mileage:any;
  color:any;
  type:any;
  username:any;
  images:any;
  constructor(public api: RestApiService,public route: ActivatedRoute) { 
  	this.car_id = this.route.snapshot.paramMap.get('id');
  	this.api.getdata('cars/getCarDetail&id='+this.car_id).subscribe(res => {
      this.cardetail = res;
      this.price = this.cardetail.price;
      this.image = this.cardetail.image;
      this.detail = this.cardetail.detail;
      this.tel = this.cardetail.tel;
      this.line = this.cardetail.line;
      this.brand = this.cardetail.brand;
      this.model = this.cardetail.model;
      this.name = this.cardetail.name;
      this.submodel = this.cardetail.submodel;
      this.year = this.cardetail.year;
      this.power = this.cardetail.power;
      this.gear = this.cardetail.gear.text;
      this.mileage = this.cardetail.mileage;
      this.color = this.cardetail.color.text;
      this.type = this.cardetail.type;
      this.username = this.cardetail.username;
      this.images = this.cardetail.images;
      // loading.dismiss();
      
    }, err => {
      console.log(err);
      // loading.dismiss();
    });
  }

  ngOnInit() {
  }

}
