import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name:any;
  constructor(private storage: Storage,public route: Router) {
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

}
