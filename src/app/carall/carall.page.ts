import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-carall',
  templateUrl: './carall.page.html',
  styleUrls: ['./carall.page.scss'],
})
export class CarallPage implements OnInit {

  public listcars:any;
  public list:any;
  public token:any;
  public page:any;
  public pagePrev:any;
  public pageNext:any;
  public pageNumber:any;
  public pageBrand:any;
  public pageType:any;
  constructor(private storage: Storage,public api: RestApiService,public route:ActivatedRoute) {
    this.storage.get('token').then((data)=>{
      this.token = data;
    });
    this.pageNumber = this.route.snapshot.paramMap.get('id');
    this.pageBrand = this.route.snapshot.paramMap.get('brand');
    this.pageType = this.route.snapshot.paramMap.get('type');
    // if (this.pageBrand == '0') {
    //   this.pageBrand = "";
    // }
    // if (this.pageType == '0') {
    //   this.pageType = "";
    // }
    
    
    // console.log(this.pageBrand);
    // &Car_type_id=&Car_subtype_id=&Car_brand_id=&Car_model_id=&Car_submodel_id=&Car_body_id=
    this.api.getdata('cars/getListCarall&page='+this.pageNumber+'&Car_brand_id='+this.pageBrand+'&Car_type_id='+this.pageType).subscribe(
      res=>{
        this.list = res;
        this.listcars = this.list.cars;
        this.page = this.list.page;
        this.pagePrev = this.list.page_prev;
        this.pageNext = this.list.page_next;
      },err=>{
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }
}
