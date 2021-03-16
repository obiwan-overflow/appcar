import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-searchcar',
  templateUrl: './searchcar.page.html',
  styleUrls: ['./searchcar.page.scss'],
})
export class SearchcarPage implements OnInit {
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
