import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-special-service',
  templateUrl: './special-service.page.html',
  styleUrls: ['./special-service.page.scss'],
})
export class SpecialServicePage implements OnInit {
  public listservice:any;
  datafail: any = [];
  constructor(public api: RestApiService,private storage: Storage,public loadingController: LoadingController) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 500
    });
    await loading.present();
    this.storage.get('token').then((data)=>{
      this.api.getdata('profile/listCoinHistory&token='+data).subscribe(res=>{
        if (res.result == "fail") {
          this.listservice = this.datafail;
        }else{
          this.listservice = res;
        }
      },err=>{
        console.log(err);
      })
    })
  }
}
