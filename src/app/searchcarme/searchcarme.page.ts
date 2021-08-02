import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-searchcarme',
  templateUrl: './searchcarme.page.html',
  styleUrls: ['./searchcarme.page.scss'],
})
export class SearchcarmePage implements OnInit {

  listbrands:any;
  constructor(public api:RestApiService) {
    this.api.getdata('brand/listBrand').subscribe(
      res=>{
        this.listbrands = res;
      },err=>{
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}
