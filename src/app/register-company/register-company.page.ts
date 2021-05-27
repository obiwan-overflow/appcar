import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {
  
  // data = {};
  data:Register;
  users:any;
  statusRegisterMember:any;
  constructor(public api:RestApiService,private fb:Facebook,public route:Router) {
    var users = { id: '', first_name: '',last_name: '', email: '', picture: { data: { url: '' } } };
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
  async fbRegisterCompany(){
    this.fb.login(['public_profile','email']).then(res=>{
      if (res.status === 'connected') {
        this.getUserDetail(res.authResponse.userID);
      }
    })
  }
  async getUserDetail(userid:any){
    this.fb.api('/' + userid + '/?fields=id,email,first_name,last_name,picture', ['public_profile'])
    .then(res => {
      console.log(res);
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
      // formData.append('profile_photo',this.users.picture);
      this.api.postdata('member/registerFacebook',formData).subscribe(res=>{
        if (res.status_register === 'success') {
          this.route.navigateByUrl('login');
        }else if(res.status_register === 'failed'){
          this.statusRegisterMember = "ลงทะเบียนไม่สำเร็จ";
        }
      },err=>{
        console.log(err);
      })
    })
    .catch(e => {
      console.log(e);
    });
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