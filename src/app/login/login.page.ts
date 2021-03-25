import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  loginDetail:any;
  status_login:any;
  loginuser: Loginuser;
  constructor(public api: RestApiService,private storage: Storage,public route: Router) { 
    
  }

  ngOnInit(): void {
    this.loginuser = new Loginuser();
  }

  login(){
    // console.log(this.loginuser); 
    this.api.getdata('login&username='+this.loginuser.username+'&password='+this.loginuser.password).subscribe(
      res=>{
        this.loginDetail = res;
        if(this.loginDetail.result == "success"){
          this.status_login = this.loginDetail.result;
          this.storage.set('token', this.loginDetail.token).then((data)=>{
            this.route.navigate(['/home']);
          });
        }
      },err=>{
        console.log(err);
      }
    );
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
