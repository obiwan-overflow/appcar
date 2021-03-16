import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {
  
  data = {};
  username:any;
  email:any;
  password:any;
  name:any;
  surname:any;
  id_card:any;
  company:any;
  address:any;
  province:any;
  zone:any;
  phone:any;
  phone1:any;
  line:any;

  constructor(public api:RestApiService) {
  	this.data = {
      username:"",
      email:"",
      password:"",
      name:"",
      surname:"",
      id_card:"",
      company:"",
      address:"",
      province:"",
      zone:"",
      phone:"",
      phone1:"",
      line:""
    }
  }

  ngOnInit() {
  }
  registerCompanyData(form:any){
  	console.log(form.value);
  }

}
