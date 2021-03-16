import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  listcar:any;
  token:any;
  car_id:any;
  title:any;
  carDetail:any;
  addwishlist:any;
  constructor(public api: RestApiService, public router: ActivatedRoute,private storage: Storage,public alertController:AlertController) {
    this.car_id = this.router.snapshot.paramMap.get('id');
    if (this.car_id == null) {
      this.storage.get('token').then((data)=>{
        this.token = data;
        this.api.getdata('cars/getListWishlist&token='+this.token).subscribe(
          res=>{
            this.listcar = res;
          },err=>{
            console.log(err);
          }
        )
      })
    }else{
      this.storage.get('token').then((data)=>{
        this.token = data;
        this.api.getdata('cars/getCarDetail&id='+this.car_id).subscribe(
          res=>{
            this.carDetail = res;
            this.title = this.carDetail.name;
            this.api.getdata('cars/addWishlist&token='+this.token+'&id='+this.car_id+'&title='+this.title).subscribe(
              res=>{
                this.addwishlist = res;
                if (this.addwishlist.result == "success") {
                  this.api.getdata('cars/getListWishlist&token='+this.token).subscribe(
                    res=>{
                      return this.listcar = res;
                    }
                  )
                }else{
                  this.api.getdata('cars/getListWishlist&token='+this.token).subscribe(
                    res=>{
                      return this.listcar = res;
                    }
                  )
                }
              }
            )
          }
        )
      })
    }
  }
  
  async delCar(event) {
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




  ngOnInit() {
  }

}
