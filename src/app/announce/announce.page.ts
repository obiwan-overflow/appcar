import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.page.html',
  styleUrls: ['./announce.page.scss'],
})
export class AnnouncePage implements OnInit {
  listcar:any;
  token:any;
  constructor(public api: RestApiService,private storage: Storage) {
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('announce/getListCars&token='+this.token).subscribe(
        res=>{
          return this.listcar = res.cars;
        },err=>{
          console.log(err);
        }
      )
    })
    // this.storage.get('token').then((data)=>{
    //   this.token = data;
    //   this.api.getdata('announce/getListCars&token='+this.token).subscribe(
    //     res=>{
    //       this.listcar = res;
    //       this.listcar = this.listcar.cars;
    //     },err=>{
    //       console.log(err);
    //     }
    //   );
    // });

    
  }
  ngOnInit() {
  }
}
