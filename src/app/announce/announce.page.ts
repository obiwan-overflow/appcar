import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.page.html',
  styleUrls: ['./announce.page.scss'],
})
export class AnnouncePage implements OnInit {
  public listcar:any;
  statusDelete:any;
  constructor(public api: RestApiService,private storage: Storage,public loadingController: LoadingController,public alertController:AlertController) {
    // this.loaddataCar();
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
      this.api.getdata('announce/getListCars&token='+data).subscribe(
        res=>{
          // console.log(res);
          this.listcar = res.cars;
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
