import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.page.html',
  styleUrls: ['./profile-setting.page.scss'],
})
export class ProfileSettingPage implements OnInit {
  
  dataedit:any;
  token:any;
  status_detail:any;
  datauser:any;
  dataUserEdit:any;
  status_update:any;



  profile: ProfileEdit;
  // profile:dataUserDetail;

  // esponseData: {};
  // imgData = {"imageB64":""}
  // public profile_photo: any;
  // public getImage: any;
  // public base64Image: string;

  userImg: any = '';
  base64Img = '';
  gelleryOptions: CameraOptions = {
    quality: 60,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true
  }

  constructor(public api:RestApiService,private storage: Storage,public route:Router,private camera : Camera) {
    this.userImg = 'assets/icon/favicon.png';
    this.storage.get('token').then((data) => {
      this.token = data;
      this.api.getdata('profile/getProfile&token='+this.token).subscribe(
        res=>{
          this.datauser = res;
          console.log(this.datauser);
          this.profile.profile_photo = this.datauser.Profile_photo;
          this.profile.type = this.datauser.Type;
          this.profile.name = this.datauser.Name;
          this.profile.surname = this.datauser.Surname;
          this.profile.id_card = this.datauser.Id_card;
          this.profile.phone = this.datauser.Phone;
          this.profile.phone1 = this.datauser.Phone1;
          this.profile.line = this.datauser.Line;
          // this.profile = {
          //   profile_photo:this.datauser.Profile_photo,
          //   type:this.datauser.Type,
          //   name:this.datauser.Name,
          //   surname:this.datauser.Surname,
          //   id_card:this.datauser.Id_card,
          //   phone:this.datauser.Phone,
          //   phone1:this.datauser.Phone1,
          //   line:this.datauser.Line
          // }
        },err=>{
          console.log(err);
        }
      );
    });
  }

  ngOnInit():void {
    this.profile = new ProfileEdit();
    // this.profile_photo = [];
  }

  profileEdit(){
    this.storage.get('token').then((data)=>{
      this.token = data;
      // var headers = new Headers();
      //   headers.append("Accept", 'application/json');
      //   headers.append('Content-Type', 'application/json' );
      // const requestOptions = new HttpHeaders({ headers: headers });
      // const requestOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
      var postData = {
        "token": this.token,
        "profile_photo": this.userImg,
        "name": this.profile.name,
        "surname": this.profile.surname,
        "id_card": this.profile.id_card,
        "phone": this.profile.phone,
        "phone1": this.profile.phone1,
        "line": this.profile.line
      }
      // this.api.postdata(this.token,postData).subscribe(res=>{console.log(res)},err=>{console.log(err)});
      // this.api.postdata(this.token,postData).subscribe(
      //   res=>{
      //     console.log(res);
      //   },err=>{
      //     console.log(err);
      //   }
      // )
      // console.log(postData);
      // this.api.postdata('profile/editProfile&token='+this.token,postData).subscribe(res=>{
      this.api.postdata('profile/editProfile',postData).subscribe(res=>{
          console.log(res);
          // if(res.result == "success"){
          //   this.route.navigate(['/profile']);
          // }
        },err=>{
          console.log(err);
        }
      )
      // this.http.post("https://www.kai2car.com/api/index.php?route=profile/editProfile&token="+this.token, postData, requestOptions).subscribe(res => {
      //   console.log(res);
      // }, error => {
      //   console.log(error);
      // });
      // this.api.getdata('profile/editProfile&token='+this.token+'&profile_photo='+this.userImg+'&name='+this.profile.name+'&surname='+this.profile.surname+'&id_card='+this.profile.id_card+'&phone='+this.profile.phone+'&phone1='+this.profile.phone1+'&line='+this.profile.line).subscribe(
      //   res=>{
      //     this.status_update = res;
      //     if(this.status_update.result == "success"){
      //       this.route.navigate(['profile']);
      //     }
      //   },err=>{
      //     console.log(err);
      //   }
      // )
    })
  }
  // takePhoto() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 450,
  //     targetHeight: 450,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   };
  //   this.camera.getPicture(options).then(
  //     imageData => {
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //       this.profile_photo.push(this.base64Image);
  //       this.profile_photo.reverse();
  //       this.getPhoto = photoData;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  openGallery() {
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     }, (err) => {
     console.log(err);
     })
  }
 }
 class ProfileEdit {
   profile_photo:any;
   type:any;
   name:any;
   surname:any;
   id_card:any;
   phone:any;
   phone1:any;
   line:any;
 }
