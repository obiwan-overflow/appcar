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
  identityToken:any;

  token:any;
  username:any;
  password:any;
  email:any;
  name:any;
  surname:any;
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
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
    .then((res: AppleSignInResponse) => {
      this.storage.set('username',res.fullName.familyName);
      this.storage.set('password',res.fullName.familyName);
      this.storage.set('email',res.email);
      this.storage.set('name',res.fullName.familyName);
      this.storage.set('surname',res.fullName.givenName);
      this.storage.set('token',res.identityToken).then((data)=>{
        this.registerAppleId();
      })
      // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
      // alert('Send token to apple for verification: ' + res.identityToken);
      // console.log(res);
      // this.api.getdata('login/loginAppleToken&token='+res.identityToken).subscribe(dataToken=>{
      //   this.loginDetail = dataToken;
      //   if (this.loginDetail.result == "success") {
      //     this.storage.set('token', this.loginDetail.token).then((data)=>{
      //       this.route.navigateByUrl('/home');
      //     });
      //   }else{
      //     const formData = new FormData();
      //     formData.append('token',res.identityToken);
      //     formData.append('username',res.fullName.familyName);
      //     formData.append('password',res.fullName.familyName);
      //     formData.append('email',res.email);
      //     formData.append('name',res.fullName.familyName);
      //     formData.append('surname',res.fullName.givenName);
      //     formData.append('type','general');
      //     formData.append('package','');
      //     formData.append('via','appleId');
      //     this.api.postdata('login/loginApple',formData).subscribe(res=>{
      //       this.loginDetail = res;
      //       if (this.loginDetail.result == "success") {
      //         this.storage.set('token', this.loginDetail.token).then((data)=>{
      //           this.route.navigateByUrl('/home');
      //         });
      //         loading.present();
      //       }else{
      //         this.loginfailed();
      //       }
      //     }) 
      //   }
      // })
    })
    .catch((error: AppleSignInErrorResponse) => {
      // alert(error.code + ' ' + error.localizedDescription);
      console.error(error);
    });
  }

  async registerAppleId(){
    this.storage.get('token').then((dataToken)=>{
      this.token = dataToken;
      this.storage.get('username').then((dataUser)=>{
        this.username = dataUser;
        this.storage.get('password').then((dataPass)=>{
          this.password = dataPass;
          this.storage.get('email').then((dataEmail)=>{
            this.email = dataEmail;
            this.storage.get('name').then((dataName)=>{
              this.name = dataName;
              this.storage.get('surname').then((dataSurname)=>{
                this.surname = dataSurname;

                const formDataApple = new FormData();
                formDataApple.append('token',this.token);
                formDataApple.append('username',this.username);
                formDataApple.append('password',this.password);
                formDataApple.append('email',this.email);
                formDataApple.append('name',this.name);
                formDataApple.append('surname',this.surname);
                formDataApple.append('type','general');
                formDataApple.append('via','appleId');
                this.api.postdata('login/loginApple',formDataApple).subscribe(res=>{});
                this.updateComplete();
              })
            })
          })
        })
      })
    })
    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    //   duration: 2000
    // });
    // const formDataApple = new FormData();
    // formDataApple.append('token',this.token);
    // formDataApple.append('username',this.username);
    // formDataApple.append('password',this.password);
    // formDataApple.append('email',this.email);
    // formDataApple.append('name',this.name);
    // formDataApple.append('surname',this.surname);
    // formDataApple.append('type','general');
    // formDataApple.append('via','appleId');
    // await this.api.postdata('login/loginApple',formDataApple).subscribe(res=>{
    //   this.loginDetail = res;
    //   if (this.loginDetail.result == "success") {
    //     this.route.navigateByUrl('/home');
    //     loading.present();
    //   }else{
    //     this.loginfailed();
    //   }
    // }) 
  }
  async updateComplete(){
    await this.route.navigateByUrl('/home');
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
