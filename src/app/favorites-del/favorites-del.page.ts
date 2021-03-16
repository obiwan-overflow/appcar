import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favorites-del',
  templateUrl: './favorites-del.page.html',
  styleUrls: ['./favorites-del.page.scss'],
})
export class FavoritesDelPage implements OnInit {
  car_id:any;
  datadel:any;
  token:any;
  cardel:any;
  constructor(public api:RestApiService,public route:Router,public router:ActivatedRoute,private storage:Storage) {
    this.storage.get('token').then((data)=>{
      this.token = data;
      // console.log(this.token);
      this.car_id = this.router.snapshot.paramMap.get('id');
      this.api.getdata('cars/delWishlist&token='+this.token+'&id='+this.car_id).subscribe(
        res=>{
          this.cardel = res;
          if(this.cardel.result == "success"){
            this.route.navigate(['/favorites']);
          }
        },err=>{
          console.log(err);
        }
      );
    });
    // this.car_id = this.router.snapshot.paramMap.get('id');
    // this.api.getdata('cars/delCar&car_id='+this.car_id).subscribe(
    //   res=>{
    //     console.log(res);
    //     this.datadel = res;
    //     if(this.datadel.result == "success"){
    //       this.route.navigate(['/favorites']);
    //     };
    //   },err=>{
    //     console.log(err);
    //   }
    // );
  }

  ngOnInit() {
  }

}
