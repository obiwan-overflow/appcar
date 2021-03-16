import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

class CoinBuy {
  idcoin:any;
}

@Component({
  selector: 'app-buy-service',
  templateUrl: './buy-service.page.html',
  styleUrls: ['./buy-service.page.scss'],
})
export class BuyServicePage implements OnInit {
  listcoin:any;
  buycoinid:any;
  status_detail:any;
  token:any;
  
  coin:CoinBuy;
  constructor(public api: RestApiService,private storage: Storage,public route: Router) {
    this.api.getdata('buyService/listCoin').subscribe(
      res=>{
        this.listcoin = res;
      },
      err=>{console.log(err);}
    );
  }

  ngOnInit():void {
    this.coin = new CoinBuy();
  }
  buycoin(){
    // console.log(this.coin);
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('buyService/buyCoin&token='+this.token+'&id='+this.coin.idcoin).subscribe(
        res=>{
          console.log(res);
        },err=>{
          console.log(err);
        }
      );
    });
  }
}
