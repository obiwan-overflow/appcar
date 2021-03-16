import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favorites-add',
  templateUrl: './favorites-add.page.html',
  styleUrls: ['./favorites-add.page.scss'],
})
export class FavoritesAddPage implements OnInit {
  token:any;
  car_id:any;
  carDetail:any;
  title:any;
  addwishlist:any;
  constructor(public api:RestApiService,private storage:Storage,public route:ActivatedRoute,public router:Router) {
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.car_id = this.route.snapshot.paramMap.get('id');
      this.api.getdata('cars/getCarDetail&id='+this.car_id).subscribe(
        res=>{
          this.carDetail = res;
          this.title = this.carDetail.name;
          this.api.getdata('cars/addWishlist&token='+this.token+'&id='+this.car_id+'&title='+this.title).subscribe(
            res=>{
              this.addwishlist = res;
              if(this.addwishlist.result == "success"){
                this.router.navigate(['/favorites']);
              }
            },err=>{
              console.log(err);
            }
          ); 
        }
      ); 
    });
  }

  ngOnInit() {
  }

}
