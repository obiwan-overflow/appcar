import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController, LoadingController } from '@ionic/angular';

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
  data:FormData;
  constructor(public api:RestApiService,public loadingController: LoadingController,public alertController:AlertController) {

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
  async filterForm(){
  	console.log(this.data);
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
