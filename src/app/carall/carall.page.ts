import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


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
  pagePrice:any;
  pageYear:any;
  pageModel:any;
  pageBody:any;
  pageSubmodel:any;
  pageProvince:any;
  package:any;
  constructor(private storage: Storage,public api: RestApiService,public route:ActivatedRoute,private iab: InAppBrowser) {
    this.storage.get('token').then((data)=>{
      this.token = data;
    });
    this.pageNumber = this.route.snapshot.paramMap.get('id');
    this.pageBrand = this.route.snapshot.paramMap.get('brand');
    this.pageType = this.route.snapshot.paramMap.get('type');
    this.pagePrice = this.route.snapshot.paramMap.get('price');   
    this.pageYear = this.route.snapshot.paramMap.get('year');  
    this.pageModel = this.route.snapshot.paramMap.get('model');
    this.pageBody = this.route.snapshot.paramMap.get('body');
    this.pageSubmodel = this.route.snapshot.paramMap.get('submodel');
    this.pageProvince = this.route.snapshot.paramMap.get('province');
    

    // &Car_type_id=&Car_subtype_id=&Car_brand_id=&Car_model_id=&Car_submodel_id=&Car_body_id=
    this.api.getdata('cars/getListCarall&page='+this.pageNumber+'&Car_brand_id='+this.pageBrand+'&Car_type_id='+this.pageType+'&Car_model_id='+this.pageModel+'&Car_body_id='+this.pageBody+'&Car_submodel_id='+this.pageSubmodel+'&year='+this.pageYear+'&price='+this.pagePrice+'&province='+this.pageProvince).subscribe(
      res=>{
        this.list = res;
        this.listcars = this.list.cars;
        this.page = this.list.page;
        this.pagePrev = this.list.page_prev;
        this.pageNext = this.list.page_next;

      },err=>{
        this.listcars = "";
        // console.log(err);
      }
    );
  }
  // async ionViewWillEnter(){
  //   this.api.getdata('cars/getListCarall&page='+this.pageNumber+'&Car_brand_id='+this.pageBrand+'&Car_type_id='+this.pageType+'&Car_model_id='+this.pageModel+'&Car_body_id='+this.pageBody+'&Car_submodel_id='+this.pageSubmodel+'&year='+this.pageYear+'&price='+this.pagePrice+'&province='+this.pageProvince).subscribe(
  //     res=>{
  //       this.list = res;
  //       this.listcars = this.list.cars;
  //       this.page = this.list.page;
  //       this.pagePrev = this.list.page_prev;
  //       this.pageNext = this.list.page_next;

  //     },err=>{
  //       this.listcars = "";
  //     }
  //   );
  // }
  openlinetest(event){
    var id = event;
    // console.log(event);
    // window.open("line://line.me/R/nv/addFriends/kittipop36","_blank");
    // const browser = this.iab.create('line://line.me/R/nv/addFriends/kittipop36');
    // const browser = this.iab.create('https://line.me/ti/p/~kittipop36');

    // const browser = this.iab.create('android-app://com.google.android.youtube','_system','location=yes');
    const browser = this.iab.create('https://line.me/R/ti/p/~'+id,'_system','location=yes');
    // browser.executeScript();
    // browser.insertCSS();
    // browser.on('loadstart').subscribe(event => {
    //    browser.insertCSS({ code: "body{color: red;" });
    // });
    // browser.close();
  }
  ngOnInit() {
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
