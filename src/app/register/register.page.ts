import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
 	data:RegisterMember;
  users:any;
  statusRegisterMember:any;
  constructor(public api:RestApiService,public route:Router,private iab: InAppBrowser,private fb:Facebook) {
    var users = { id: '', first_name: '',last_name: '', email: '', picture: { data: { url: '' } } };
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
  async fbRegister(){
    this.fb.login(['public_profile','email']).then(res=>{
      if (res.status === 'connected') {
        this.getUserDetail(res.authResponse.userID);
      }
    })
  }
  async getUserDetail(userid:any){
    this.fb.api('/' + userid + '/?fields=id,email,first_name,last_name,picture', ['public_profile'])
    .then(res => {
      console.log(res);
      this.users = res;
      const formData = new FormData();
      formData.append('username',this.users.id);
      formData.append('password',this.users.id);
      formData.append('email',this.users.email);
      formData.append('name',this.users.first_name);
      formData.append('surname',this.users.last_name);
      formData.append('type','general');
      formData.append('package','jaidee');
      formData.append('via','facebook');
      // formData.append('profile_photo',this.users.picture);
      this.api.postdata('member/registerFacebook',formData).subscribe(res=>{
        if (res.status_register === 'success') {
          this.route.navigateByUrl('login');
        }else if(res.status_register === 'failed'){
          this.statusRegisterMember = "ลงทะเบียนไม่สำเร็จ";
        }
      },err=>{
        console.log(err);
      })
    })
    .catch(e => {
      console.log(e);
    });
  }

}
class RegisterMember {
  username:any;
  password:any;  
}