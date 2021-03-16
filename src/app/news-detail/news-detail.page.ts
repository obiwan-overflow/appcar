import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  news:any;
  news_id:any;
  image:any;
  title:any;
  date:any;
  detail:any;
  constructor(public api: RestApiService,public route: ActivatedRoute) { 
  	this.news_id = this.route.snapshot.paramMap.get('id');
  	this.api.getdata('information/getNewsDetail&news_id='+this.news_id).subscribe(res => {
      this.news = res;
      this.image = this.news.image;
      this.title = this.news.title;
      this.date = this.news.date;
      this.detail = this.news.detail;
      // loading.dismiss();
      
    }, err => {
      console.log(err);
      // loading.dismiss();
    });
  }

  ngOnInit() {
  }

}
