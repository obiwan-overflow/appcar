import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
 	data:RegisterMember;
  constructor(public api:RestApiService,public route:Router,private fb: Facebook) {

  }

  ngOnInit():void {
    this.data = new RegisterMember();
  }
  async register(){
    console.log(this.data);
    const formData = new FormData();
    formData.append('username',this.data.username);
    formData.append('password',this.data.password);
    this.api.postdata('member/registerGeneral',formData).subscribe(res=>{
      console.log(res);
      this.route.navigateByUrl('login');
    },err=>{
      console.log(err);
    })
  }
  async fbLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
  }

}
class RegisterMember {
  username:any;
  password:any;  
}