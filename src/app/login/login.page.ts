import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  loginDetail:any;
  status_login:any;
  loginuser: Loginuser;
  isLoggedIn = false;
  datalogin:any;
  users:any;
  constructor(public api: RestApiService,private storage: Storage,public route: Router,public alertController:AlertController,public loadingController: LoadingController,private iab: InAppBrowser,private fb: Facebook) { 
     var users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
     fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === 'connect') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  ngOnInit(): void {
    this.loginuser = new Loginuser();
  }

  async login(){
    // console.log(this.loginuser); 
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await this.api.getdata('login&username='+this.loginuser.username+'&password='+this.loginuser.password).subscribe(
      res=>{
        this.loginDetail = res;
        if(this.loginDetail.result == "success"){
          this.status_login = this.loginDetail.result;
          this.storage.set('token', this.loginDetail.token).then((data)=>{
            this.route.navigateByUrl('/home');
          });
          loading.present();
        }
      },err=>{
        console.log(err);
      }
    );
  }
  async fbLogin(){
    this.fb.login(['public_profile','user_friends', 'email']).then(
      res=>{
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        }else{
          this.isLoggedIn = false;
        }
      }
    ).catch(e => console.log('Error logging into Facebook', e));
  }
  async getUserDetail(userid:any){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
    .then(res => {
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
      this.api.postdata('login/loginFacebook',formData).subscribe(res=>{
        this.loginDetail = res;
        if (this.loginDetail.result == "success") {
          this.storage.set('token', this.loginDetail.token).then((data)=>{
            this.route.navigateByUrl('/home');
          });
          loading.present();
        }else{
          this.status_login = this.loginDetail.result;
        }
      })
      // this.api.getdata('login/loginFacebook&email='+this.users.email).subscribe(
      //   res=>{
      //     this.loginDetail = res;
      //     if (this.loginDetail.result == "success") {
      //       this.storage.set('token', this.loginDetail.token).then((data)=>{
      //         this.route.navigateByUrl('/home');
      //       });
      //       loading.present();
      //     }
      //   },err=> {
      //     console.log(err);
      //   }
      // )
    })
    .catch(e => {
      console.log(e);
    });
  }
  /*async login(username:string,password:string) {

    // const loading = await this.loadingController.create({
    // // content: 'Loading'
    // });
    // await loading.present();
    // await 
    this.api.getdata('login&username='+username+'&password='+password).subscribe(res => {
      // console.log(res);
      this.loginDetail = res;
      // console.log(this.loginDetail);
      // loading.dismiss();
      if(this.loginDetail.result=='success'){
      	this.status_login = this.loginDetail.result
      	
        this.storage.set('token', this.loginDetail.token).then((data) => {
        	this.storage.set('name', this.loginDetail.name).then((data) => {
        		this.route.navigate(['/home']);
	    	});
	    });
        

        // this.storage.get('token')
        // this.route.navigate(['/home']);


        // this.storage.set('phone', this.loginDetail.phone);
        // this.storage.set('address', this.loginDetail.address);
        // this.storage.set('emp_key', this.loginDetail.emp_key);
        // console.log(this.loginDetail.emp_key);
        // this.storage.set('title', this.loginDetail.title);
        // this.storage.set('firstname', this.loginDetail.firstname);
        // this.storage.set('lastname', this.loginDetail.lastname);
        // this.storage.set('nickname', this.loginDetail.nickname);
        // return this.storage.set(TOKEN_KEY, this.loginDetail.emp_key).then(() => {
        //   this.authenticationState.next(true);
        // });
      }else{
        // this.alert();
        // return this.storage.remove(TOKEN_KEY).then(() => {
        //   this.authenticationState.next(false);
        // });
      }
      
    }, err => {
      console.log(err);
      // loading.dismiss();
    });
    
  }*/

}
class Loginuser {
  username:any;
  password:any;
}
