import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';

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
  loginDetailApple:any;
  constructor(
    public api: RestApiService,
    private storage: Storage,
    public route: Router,
    public alertController:AlertController,
    public loadingController: LoadingController,
    private iab: InAppBrowser,
    private fb: Facebook,
    private signInWithApple: SignInWithApple
  ) { 
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
          this.storage.set('token', this.loginDetail.token).then((data)=>{
            this.route.navigateByUrl('/home');
          });
          loading.present();
        }else {
          this.loginfailed();
        }
      },err=>{
        console.log(err);
      }
    );
  }


  async loginfailed(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Failed !',
      duration: 2000
    });
    loading.present();
  }



  async fbLogin(){
    this.fb.login(['public_profile', 'email']).then(
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

  async appleLogin(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
    .then((res: AppleSignInResponse) => {
      // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
      // alert('Send token to apple for verification: ' + res.identityToken);
      // console.log(res);
      this.api.getdata('login/loginApple&email='+res.email+'&name='+res.fullName.familyName+'&surname='+res.fullName.givenName).subscribe(res=>{
        this.loginDetailApple = res;
        if (this.loginDetailApple.result == "success") {
          this.storage.set('token', this.loginDetailApple.token).then((data)=>{
            this.route.navigateByUrl('/home');
          });
          loading.present();
        }else{
          // this.status_login = this.loginDetail.result;
        }
      })
    })
    .catch((error: AppleSignInErrorResponse) => {
      alert(error.code + ' ' + error.localizedDescription);
      console.error(error);
    });
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
          // this.status_login = this.loginDetail.result;
        }
      })
    })
    .catch(e => {
      console.log(e);
    });
  }
}
class Loginuser {
  username:any;
  password:any;
}
