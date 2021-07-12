import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	banner:any;
	brand:any;
	ios:boolean;
	android:boolean;
  	constructor(public api: RestApiService,public platform: Platform) {
		this.api.getdata('information/getListBanner').subscribe(res=>{
			this.banner = res;
		},err=> {
			console.log(err);
		});
		this.api.getdata('brand/listBrand').subscribe(
			res=>{
				this.brand = res;
			},err=>{
				console.log(err);
			}
		);
	}

	ngOnInit() {
  	}
}
