import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.page.html',
  styleUrls: ['./announce.page.scss'],
})
export class AnnouncePage implements OnInit {
  public listcar:any;
  statusDelete:any;
  page:any;
  pagePrev:any;
  pageNext:any;
  pageNumber:any;
  constructor(
    public api: RestApiService,
    private storage: Storage,
    public loadingController: LoadingController,
    public alertController:AlertController,
    public route:ActivatedRoute) {
    // this.loaddataCar();
    this.pageNumber = this.route.snapshot.paramMap.get('pageid');
  }

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
      this.api.getdata('announce/getListCars&token='+data+'&page='+this.pageNumber).subscribe(
        res=>{
          // console.log(res);
          this.listcar     = res.cars;
          this.page       = res.page;
          this.pagePrev    = res.page_prev; 
          this.pageNext    = res.page_next;
        },err=>{
          console.log(err);
        }
      )
    })
  }

  async btnDelcar(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Car!',
      message: 'Do you want to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteCar(id);
          }
        }
      ]
    });
    await alert.present();
  }
  async deleteCar(id){
    this.storage.get('token').then((data)=>{
      this.api.getdata('cars/delCar&token='+data+'&id='+id).subscribe(
        res=>{
          this.statusDelete = res;
          if (this.statusDelete.result == "success") {
            this.ionViewWillEnter();
          }
        }
      )
    })
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  // async loaddataCar(){
  //   await this.storage.get('token').then((data)=>{
  //     this.api.getdata('announce/getListCars&token='+data).subscribe(
  //       res=>{
  //         this.listcar = res.cars;
  //       }
  //     )
  //   })
  // }

}
