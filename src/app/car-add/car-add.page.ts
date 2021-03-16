import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { analyzeAndValidateNgModules } from '@angular/compiler';
// interface datacar{
//   type_id:any,
//   brand_id:any,
//   generation_id:any,
//   face_id:any,
//   model_id:any,
//   year_id:any,
//   cc_id:any,
//   gear_id:any,
//   mile:any,
//   color:any,
//   price:any,
//   license:any,
//   detail:any,
//   image:any,
//   yb:any
// }
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.page.html',
  styleUrls: ['./car-add.page.scss'],
})
export class CarAddPage implements OnInit {
  listtype:any;
  listbrand:any;
  listgen:any;
  listface:any;
  listyear:any;
  listcc:any;
  listmodel:any;
  listgear:any;
  caradd:any;
  status_detail:any;
  brand_id:any;
  model_id:any;
  token:any;
  title:any;
  idbrand:any;
  val_brand:any;
  val_gen:any;

  cardata:CardataAdd;
  // public cardata:datacar;
  constructor(public api:RestApiService,private storage:Storage) {
    // this.cardata = {
    //   type_id:'',
    //   brand_id:'',
    //   generation_id:'',
    //   face_id:'',
    //   model_id:'',
    //   year_id:'',
    //   cc_id:'',
    //   gear_id:'',
    //   mile:'',
    //   color:'',
    //   price:'',
    //   license:'',
    //   detail:'',
    //   image:'',
    //   yb:''
    // } 
    this.api.getdata('cars/getListType').subscribe(res=>{this.listtype = res;});
    this.api.getdata('cars/getListBand').subscribe(res=>{this.listbrand = res;});
    this.api.getdata('cars/getListYear').subscribe(res=>{this.listyear = res;});
    this.api.getdata('cars/getListCC').subscribe(res=>{this.listcc = res;});
    this.api.getdata('cars/getListGear').subscribe(res=>{this.listgear = res;});
  }
  
  getGen($event){
    this.brand_id = $event.target.value;
    this.api.getdata('cars/getLlistGeneration&brand_id='+this.brand_id).subscribe(
      res=>{
        this.listgen = res;
      }
    );
  }
  getFace($event){
    this.model_id = $event.target.value;
    this.api.getdata('cars/getListFace&brand_id='+this.brand_id+'&model_id='+this.model_id).subscribe(
      res=>{
        this.listface = res;
      }
    );
    this.api.getdata('cars/getListModel&brand_id='+this.brand_id+'&model_id='+this.model_id).subscribe(
      res=>{
        this.listmodel = res;
      }
    );
  }
  formcar(){
    this.storage.get('token').then((data)=>{
      this.token = data;
      // this.title = form.value.year_id+" "+form.value.brand_id+" "+form.value.generation_id;
      // console.log(this.cardata);
      this.api.getdata('cars/getBand&id='+this.cardata.brand_id).subscribe(res=>{
        this.val_brand = res;
        this.api.getdata('cars/getGeneration&id='+this.cardata.generation_id).subscribe(res=>{
          this.val_gen = res;
          this.title = this.cardata.year_id+" "+this.val_brand.text+" "+this.val_gen.text;
          this.api.getdata('cars/addCar&token='+this.token+'&title='+this.title+'&type_id='+this.cardata.type_id+'&brand_id='+this.cardata.brand_id+'&generation_id='+this.cardata.generation_id+'&face_id='+this.cardata.face_id+'&model_id='+this.cardata.model_id+'&year_id='+this.cardata.year_id+'&cc_id='+this.cardata.cc_id+'&gear_id='+this.cardata.gear_id+'&mile='+this.cardata.mile+'&color='+this.cardata.color+'&price='+this.cardata.price+'&license='+this.cardata.license+'&detail='+this.cardata.detail+'&image='+this.cardata.image).subscribe(
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
  ngOnInit():void {
    this.cardata = new CardataAdd();
  }

}
class CardataAdd {
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
  yb:any;
}
