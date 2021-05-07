import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
 	data:RegisterMember;
  constructor(public api:RestApiService) {
  	// this.data = {
  	// 	email:'',
  	// 	password:''
  	// }
  }

  ngOnInit():void {
    this.data = new RegisterMember();
  }
  async register(){
    console.log(this.data);
  }
  // register(form:any){
  // 	console.log(form);
  // }

}
class RegisterMember {
  email:any;
  password:any;  
}