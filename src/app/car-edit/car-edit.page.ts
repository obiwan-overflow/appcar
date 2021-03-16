import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.page.html',
  styleUrls: ['./car-edit.page.scss'],
})
export class CarEditPage implements OnInit {
  listtype:any;
  listbrand:any;
  listgen:any;
  listface:any;
  listyear:any;
  listcc:any;
  listmodel:any;
  listgear:any;
  caredit:any;
  status_detail:any;
  car_id:any;


  cardata_detail:any;
  car_mile:any;
  car_price:any;
  car_label:any;
  car_color:any;
  car_detail:any;
  car_images:any;
  car_brand:any;
  car_type_id:any;
  car_cc:any;
  car_year:any;
  car_model:any;
  sub_model:any;
  car_body:any;
  car_type_name:any;
  car_brand_name:any;
  car_model_name:any;
  car_gear_id:any;
  car_gear_name:any;
  car_submodel_name:any;
  car_subtype_name:any;
  car_subtype_id:any;
  token:any;

  title:any;
  val_brand:any;
  val_gen:any;

  // type_id:any;
  // brand_id:any;
  // generation_id:any;
  // face_id:any;
  // model_id:any;
  // year_id:any;
  // cc_id:any;
  // gear_id:any;
  // mile:any;
  // color:any;
  // price:any;
  // license:any;
  // detail:any;
  // image:any;
  // todo:any;
  todo:CarEdit;
  constructor(public api:RestApiService,public route:ActivatedRoute,private storage:Storage) {
    this.car_id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('cars/getCarDetail&id='+this.car_id).subscribe(
      res=>{
        // console.log(res);
        this.car_mile = res.mileage;
        this.car_price = res.price;
        this.car_label = res.label;
        this.car_color = res.color;
        this.car_detail = res.detail;
        this.car_images = res.images;
        this.car_brand = res.Car_band_id;
        this.car_type_id = res.Car_type_id;
        this.car_cc = res.power;
        this.car_year = res.year;
        this.car_gear_id = res.gear.id;
        this.car_gear_name = res.gear.text;
        this.car_model = res.Car_model_id;
        this.sub_model = res.Car_submodel_id;
        this.car_body = res.Car_body_id;
        this.car_type_name = res.type;
        this.car_brand_name = res.brand;
        this.car_model_name = res.model;
        this.car_submodel_name = res.submodel;
        this.car_subtype_name = res.subtype;
        this.car_subtype_id = res.Car_subtype_id;

        this.api.getdata('cars/getListType').subscribe(res=>{this.listtype = res;})
        this.api.getdata('cars/getListBand').subscribe(res=>{this.listbrand = res;})
        this.api.getdata('cars/getListYear').subscribe(res=>{this.listyear = res;})
        this.api.getdata('cars/getListCC').subscribe(res=>{this.listcc = res;})
        this.api.getdata('cars/getListGear').subscribe(res=>{this.listgear = res;})
        this.api.getdata('cars/getLlistGeneration&brand_id='+this.car_brand).subscribe(res=>{this.listgen = res;})
        this.api.getdata('cars/getListFace&brand_id='+this.car_brand+'&model_id='+this.car_model).subscribe(res=>{this.listface = res;})
        this.api.getdata('cars/getListModel&brand_id='+this.car_brand+'&model_id='+this.car_model).subscribe(res=>{this.listmodel = res;})

        this.todo.type_id = this.car_type_id;
        this.todo.brand_id = this.car_brand;
        this.todo.generation_id = this.car_model;
        this.todo.face_id = this.car_body;
        this.todo.model_id = this.sub_model;
        this.todo.year_id = this.car_year;
        this.todo.cc_id = this.car_cc;
        this.todo.gear_id = this.car_gear_id;
        this.todo.mile = this.car_mile;
        this.todo.color = this.car_color;
        this.todo.price = this.car_price;
        this.todo.license = this.car_label;
        this.todo.detail = this.car_detail;
        this.todo.image = this.car_images;
        // this.todo = {
        //   type_id:this.car_type_id,
        //   brand_id:this.car_brand,
        //   generation_id:this.car_model,
        //   face_id:this.car_body,
        //   model_id:this.sub_model,
        //   year_id:this.car_year,
        //   cc_id:this.car_cc,
        //   gear_id:this.car_gear,
        //   mile:this.car_mile,
        //   color:this.car_color,
        //   price:this.car_price,
        //   license:this.car_label,
        //   detail:this.car_detail,
        //   image:this.car_images
        // }
      }
    );
  }

  ngOnInit():void {
    this.todo = new CarEdit();
  }
  
  editForm(){
    this.storage.get('token').then((data)=>{
      this.token = data;
      // console.log(this.todo);
      this.api.getdata('cars/getBand&id='+this.todo.brand_id).subscribe(res=>{
        this.val_brand = res;
        this.api.getdata('cars/getGeneration&id='+this.todo.generation_id).subscribe(res=>{
          this.val_gen = res;
          this.title = this.todo.year_id+" "+this.val_brand.text+" "+this.val_gen.text;
          this.api.getdata('cars/editCar&token='+this.token+'&id='+this.car_id+'&title='+this.title+'&type_id='+this.todo.type_id+'&brand_id='+this.todo.brand_id+'&generation_id='+this.todo.generation_id+'&face_id='+this.todo.model_id+'&model_id='+this.todo.face_id+'&year_id='+this.todo.year_id+'&cc_id='+this.todo.cc_id+'&gear_id='+this.todo.gear_id+'&color='+this.todo.color+'&mile='+this.todo.mile+'&license='+this.todo.license+'&detail='+this.todo.detail+'&price='+this.todo.price+'&image='+this.todo.image).subscribe(
            res=>{
              console.log(res);
            },err=>{
              console.log(err);
            }
          );
        });
      });
    });
  }
}
class CarEdit{
  type_id:any;
  brand_id:any;
  generation_id:any;
  face_id:any;
  model_id:any;
  year_id:any;
  cc_id:any;
  gear_id:any;
  mile:any;
  color:any;
  price:any;
  license:any;
  detail:any;
  image:any;
}
