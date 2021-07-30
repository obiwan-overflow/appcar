import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
})
export class CarDetailPage implements OnInit {
  defaultHref = '';
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

  public pageNumber:any;
  public pageBrand:any; 
  public pageType:any;  
  constructor(public api: RestApiService,public route: ActivatedRoute,private storage: Storage,private iab: InAppBrowser) { 
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
  openlinetest(event){
    var id = event;
    const browser = this.iab.create('https://line.me/R/ti/p/~'+id,'_system','location=yes');
  }
  ionViewDidEnter() {
    
  }
  // async callphone(phone){
  //   this.callNumber.callNumber(phone,true);
  // }

}
