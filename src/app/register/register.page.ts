import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
  data = {};
  email:any;
  password:any;			
  constructor(public api:RestApiService) {
  	this.data = {
  		email:'',
  		password:''
  	}
  }

  ngOnInit() {
  }
  register(form:any){
  	console.log(form);
  }

}
