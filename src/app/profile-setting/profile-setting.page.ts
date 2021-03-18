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

  esponseData: {};
  imgData = {"imageB64":""}
  public profile_photo: any;
  public getImage: any;
  public base64Image: string;

  constructor(public api:RestApiService,private storage: Storage,public route:Router,private camera : Camera) {
    this.storage.get('token').then((data) => {
      this.token = data;
      this.api.getdata('profile/getProfile&token='+this.token).subscribe(
        res=>{
          this.datauser = res;
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
    this.profile_photo = [];
  }

  profileEdit(){
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('profile/editProfile&token='+this.token+'&profile_photo='+this.profile_photo+'&name='+this.profile.name+'&surname='+this.profile.surname+'&id_card='+this.profile.id_card+'&phone='+this.profile.phone+'&phone1='+this.profile.phone1+'&line='+this.profile.line).subscribe(
        res=>{
          this.status_update = res;
          if(this.status_update.result == "success"){
            this.route.navigate(['profile']);
          }
        },err=>{
          console.log(err);
        }
      )
    })
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.profile_photo.push(this.base64Image);
        this.profile_photo.reverse();
        // this.getPhoto = photoData;
      },
      err => {
        console.log(err);
      }
    );
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
