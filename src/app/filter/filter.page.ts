import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  cartype:any;
  carbrand:any;
  carprovince:any;
  carmodels:any;
  carBody:any;
  carsubBody:any;
  data:FormData;
  constructor(public api:RestApiService,public loadingController: LoadingController,public alertController:AlertController,public route:Router) {

  	this.api.getdata('filterCar/getProvinces').subscribe(res=>{
  		this.carprovince = res;
  	})
  	this.api.getdata('cars/getListType').subscribe(res=>{
  		this.cartype = res;
  	})
  	this.api.getdata('cars/getListBand').subscribe(res=>{
  		this.carbrand = res;
  	})
  }

  ngOnInit() {
  	this.data = new FormData();
  }
  async getModel(){
    this.api.getdata('filterCar/getModelCars&id='+this.data.brand).subscribe(res=>{
      this.carmodels = res;
    })
  }
  async getBody(){
    this.api.getdata('filterCar/getBody&brand_id='+this.data.brand+'&model_id='+this.data.model).subscribe(res=>{
      this.carBody = res;
    })
  }
  async getsubBody(){
    this.api.getdata('filterCar/getsubBody&body_id='+this.data.body).subscribe(res=>{
      this.carsubBody = res;
      // console.log(this.carsubBody);
    })
  }
  async filterForm(){
    if (!this.data.province){
      this.data.province = 0;
    }
    if (!this.data.type) {
      this.data.type = 0;
    }
    if (!this.data.brand) {
      this.data.brand = 0;
    }
    if (!this.data.model) {
      this.data.model = 0;
    }
    if (!this.data.body) {
      this.data.body = 0;
    }
    if (!this.data.submodel) {
      this.data.submodel = 0;
    }
    if (!this.data.price) {
      this.data.price = 0;
    }
    if (!this.data.year) {
      this.data.year = 0;
    }
  	this.route.navigateByUrl('carall/1/'+this.data.type+'/'+this.data.brand+'/'+this.data.model+'/'+this.data.body+'/'+this.data.submodel+'/'+this.data.year+'/'+this.data.price+'/'+this.data.province);
  }
}
class FormData{
	province:any;
	type:any;
  brand:any;
  model:any;
  body:any;
  submodel:any;
  year:any;
  price:any;
}
