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
  constructor(public api: RestApiService,private storage: Storage,public route: Router,public alertController:AlertController,public loadingController: LoadingController,private iab: InAppBrowser,private fb: Facebook) { 
     
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
    // const url = "https://www.facebook.com/v2.11/dialog/oauth?client_id=743881755820988&state=9eb6ddc264efc9dc28384573e8f448a0&response_type=code&sdk=php-sdk-5.5.0&redirect_uri=https://www.kai2car.com/member/facebook-login&scope=email";
    // const browser = this.iab.create(url,'_system','location=yes');
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.fb.login(['public_profile', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        this.isLoggedIn = true;
        this.datalogin = res.authResponse.userID;
        this.api.getdata('login/loginFacebook&userId='+this.datalogin).subscribe(
          res=>{
            this.loginDetail = res;
            if(this.loginDetail.result == "success"){
              this.status_login = this.loginDetail.result;
              this.storage.set('token', this.loginDetail.token).then((data)=>{
                this.route.navigateByUrl('/home');
              });
              loading.present();
            }
          }
        )
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  //   this.fb.login(['public_profile', 'email'])
  // .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  // .catch(e => console.log('Error logging into Facebook', e));

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
