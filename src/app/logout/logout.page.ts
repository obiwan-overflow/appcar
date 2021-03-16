import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private storage:Storage,public route:Router) {
  	// this.storage.set('token','').then((data)=>{
  	// 	this.route.navigate(['/login']);
  	// })
    this.storage.set('token','').then((data)=>{
      this.route.navigate(['/login']);
    })
    
  }

  ngOnInit() {
  }

}
