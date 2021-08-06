import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name:any;
  token:any;
  login:any;
  profile:any;
  fullname:any;
  coin:any;
  image:any;
  constructor(private storage: Storage,public route: Router,public loadingController: LoadingController,public api:RestApiService) {
  	// this.storage.get('token').then((data) => {
   //  	if(data == ''){
   //  		this.route.navigate(['/login']);
   //  	}
   //  	this.storage.get('name').then((data) => {
   //    	this.name = data
   //    });
   //  });
    
  }
  async ionViewDidEnter(){
    await this.storage.get('token').then((data)=>{
      this.token = data;
      // if (data == null) {
      //   this.login = "failed";
      // }else{
      //   this.login = "success";
      //   this.token = data;
      // }
    })
    await this.api.getdata('profile/getProfile&token='+this.token).subscribe(res=>{
      if (res.result == "fail") {
        this.login = "failed";
      }else{
        this.login = "success";
        this.profile     = res;
        this.fullname    = this.profile.Name+" "+this.profile.Surname;
        this.coin        = this.profile.coin;
        this.image       = this.profile.path_image_resize;
      }
    },err=>{
      console.log(err);
    })
  }

  ngOnInit() {
  }
  async logout(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await this.storage.remove('token').then((data)=>{
      this.route.navigateByUrl('login');
    })
    await loading.present();
  }

}
