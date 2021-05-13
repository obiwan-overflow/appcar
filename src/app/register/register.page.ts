import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
 	data:RegisterMember;
  constructor(public api:RestApiService,public route:Router) {

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
    console.log("test");
  }

}
class RegisterMember {
  username:any;
  password:any;  
}