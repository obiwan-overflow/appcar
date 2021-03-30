import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name:any;
  constructor(private storage: Storage,public route: Router,public loadingController: LoadingController) {
  	this.storage.get('token').then((data) => {
    	if(data == ''){
    		this.route.navigate(['/login']);
    	}
    	this.storage.get('name').then((data) => {
      	this.name = data
      });
    });
    
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
