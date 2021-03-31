import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';



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
    quality: 50,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
  }

  constructor(public api:RestApiService,private storage: Storage,public route:Router,private camera : Camera,public loadingController: LoadingController) {
    
  }

  ngOnInit():void {
    this.profile = new ProfileEdit();
    // this.profile_photo = [];
  }

  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    this.status_update = "";
    this.storage.get('token').then((data) => {
      this.token = data;
      this.api.getdata('profile/getProfile&token='+this.token).subscribe(
        res=>{
          this.datauser = res;
          this.profile.type = this.datauser.Type;
          this.profile.name = this.datauser.Name;
          this.profile.surname = this.datauser.Surname;
          this.profile.id_card = this.datauser.Id_card;
          this.profile.phone = this.datauser.Phone;
          this.profile.phone1 = this.datauser.Phone1;
          this.profile.line = this.datauser.Line;

          // this.userImg = 'assets/icon/favicon.png';
          this.userImg = this.datauser.path_image_resize;
          loading.present();
        },err=>{
          console.log(err);
        }
      );
    });
  }

  async profileEdit(){
    this.storage.get('token').then((data)=>{
      this.token = data;
      // var formData = {
      //   "token": this.token,
      //   "profile_photo": this.userImg,
      //   "name": this.profile.name,
      //   "surname": this.profile.surname,
      //   "id_card": this.profile.id_card,
      //   "phone": this.profile.phone,
      //   "phone1": this.profile.phone1,
      //   "line": this.profile.line
      // }

      const formData = new FormData();
      formData.append('token',this.token);
      formData.append('profile_photo',this.userImg);
      formData.append('name',this.profile.name);
      formData.append('surname',this.profile.surname);
      formData.append('id_card',this.profile.id_card);
      formData.append('phone',this.profile.phone);
      formData.append('phone1',this.profile.phone1);
      formData.append('line',this.profile.line);

      this.api.postdata('profile/editProfile',formData).subscribe(res=>{
          console.log(res);
          if(res.result == "success"){
            this.status_update = "แก้ไขข้อมูลเรียบร้อย"
            // this.route.navigate(['/profile']);
          }
        },err=>{
          console.log(err);
        }
      )
    })
  }
  async openGallery() {
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     // console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     }, (err) => {
     console.log(err);
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
