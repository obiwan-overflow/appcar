import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news:any;
  constructor(public api: RestApiService) {
    // this.url = 'api/index.php?route=information/getListNews'; 
    this.api.getdata('information/getListNews').subscribe(res => {
      this.news = res;
      // loading.dismiss();
      
    }, err => {
      console.log(err);
      // loading.dismiss();
    });
  }
  	new = [
		{img: 'assets/images/banner/banner.jpg'},
		{img: 'assets/images/banner/banner.jpg'},
		{img: 'assets/images/banner/banner.jpg'}
	];

  ngOnInit() {
  }

}
