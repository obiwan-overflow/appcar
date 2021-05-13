import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {
  
  // data = {};
  data:Register;
  constructor(public api:RestApiService) {

  }

  ngOnInit():void {
    this.data = new Register();
  }
  async registerCompanyData(){
    const formData = new FormData();
    formData.append('username',this.data.username);
    formData.append('email',this.data.email);
    formData.append('password',this.data.password);
    formData.append('name',this.data.name);
    formData.append('surname',this.data.surname);
    formData.append('id_card',this.data.id_card);
    formData.append('company',this.data.company);
    formData.append('address',this.data.address);
    formData.append('province',this.data.province);
    formData.append('zone',this.data.zone);
    formData.append('phone',this.data.phone);
    formData.append('phone1',this.data.phone1);
    formData.append('line',this.data.line);
    this.api.postdata('member/registerCompany',formData).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

}
class Register {
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
}