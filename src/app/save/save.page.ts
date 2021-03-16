import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {
  listcar:any;
  token:any;
  constructor(public api: RestApiService,private storage:Storage,public alertController: AlertController) {
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('cars/getListWishlist&token='+this.token).subscribe(
        res=>{
          return this.listcar = res;
        }
      );
    });
  }

  ngOnInit() {
  }
  async delCar(event){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      // message: 'Message <strong>text</strong>!!!',
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
            this.storage.get('token').then((data)=>{
              this.token = data;
              this.api.getdata('cars/delWishlist&token='+this.token+'&id='+event.target.id).subscribe(
                res=>{
                  this.api.getdata('cars/getListWishlist&token='+this.token).subscribe(
                    res=>{
                      return this.listcar = res;
                    },err=>{
                      console.log(err);
                    }
                  )
                },err=>{
                  console.log(err);
                }
              )
            })
          }
        }
      ]
    });
    await alert.present();
  }

}
