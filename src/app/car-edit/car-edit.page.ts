import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.page.html',
  styleUrls: ['./car-edit.page.scss'],
})
export class CarEditPage implements OnInit {
  /// In declarations : 

years: any[ ] = [
    {
      id: 1,
      name: '2019'
    },
    {
      id: 2,
      name:'2018'
    },
    {
      id: 3,
      name:'2017'
    },{
      id:4,
      name:'2016'
    }
  ];

  compareWith : any ;
  MyDefaultBrandIdValue: string;
  MyDefaultTypeIdValue: string;
  MyDefaultGearsIdValue: string;
  MyDefaultColorIdValue: string;
  MyDefaultCCIdValue: string;
  MyDefaultYearIdValue: string;
  MyDefaultFaceIdValue: string;
  MyDefaultGenIdValue: string;
  MyDefaultModelIdValue: string;
///// In functions declaration zone

  compareWithFn(o1, o2) {
    return o1 === o2;
  };

  listtype:any;
  listbrand:any;
  listgen:any;
  listface:any;
  listyear:any;
  listcc:any;
  listmodel:any;
  listgear:any;
  listcolor:any;
  caredit:any;
  status_detail:any;
  car_id:any;
  brand_id:any;
  model_id:any;

  cardata_detail:any;
  car_mile:any;
  car_price:any;
  car_label:any;
  car_color_id:any;
  car_color_title:any;
  car_detail:any;
  car_images:any;
  car_image:any;
  car_brand:any;
  car_type_id:any;
  car_cc:any;
  car_year:any;
  car_model:any;
  sub_model:any;
  car_body:any;
  car_type_name:any;
  car_brand_name:any;
  car_model_name:any;
  car_gear_id:any;
  car_gear_name:any;
  car_submodel_name:any;
  car_subtype_name:any;
  car_subtype_id:any;
  token:any;
  car_brand1:any;
  car_brand2:any;
  car_model1:any;
  car_model2:any;

  title:any;
  val_brand:any;
  val_gen:any;

  todo:CarEdit;
  imagesarray:any = [];
  userImg: any = '';
  base64Img = '';

listmodelSelect:any;

  gelleryOptions: CameraOptions = {
    quality: 50,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
  }
 
  

  constructor(public api:RestApiService,public route:ActivatedRoute,private storage:Storage,private camera : Camera,public alertController:AlertController,public loadingController: LoadingController) {

  }

  async ionViewWillEnter(){
    this.car_id = this.route.snapshot.paramMap.get('id');
    await this.api.getdata('cars/getCarDetail&id='+this.car_id).subscribe(
      res_data=>{
        // console.log(res_data);
        this.car_mile = res_data.mileage;
        this.car_price = res_data.price;
        this.car_label = res_data.label;
        this.car_color_id = res_data.color.id;
        this.car_color_title = res_data.color.text;
        this.car_detail = res_data.detail;
        this.car_images = res_data.images;
        this.car_brand = res_data.Car_band_id;
        // this.car_brand1 = res_data.Car_band_id;
        // this.car_brand2 = res_data.Car_band_id;
        this.car_type_id = res_data.Car_type_id;
        this.car_cc = res_data.power;
        this.car_year = res_data.year;
        this.car_gear_id = res_data.gear.id;
        this.car_gear_name = res_data.gear.text;
        this.car_model = res_data.Car_model_id;
        // this.car_model1 = res_data.Car_model_id;
        // this.car_model2 = res_data.Car_model_id;
        this.sub_model = res_data.Car_submodel_id;
        this.car_body = res_data.Car_body_id;
        this.car_type_name = res_data.type;
        this.car_brand_name = res_data.brand;
        this.car_model_name = res_data.model;
        this.car_submodel_name = res_data.submodel;
        this.car_subtype_name = res_data.subtype;
        this.car_subtype_id = res_data.Car_subtype_id;
        this.car_image = res_data.image;

        this.api.getdata('cars/getListType').subscribe(res=>{
          this.listtype = res;
          this.MyDefaultTypeIdValue = this.car_type_id;
        })
        this.api.getdata('cars/getListBand').subscribe(res=>{
          this.listbrand = res;
          this.MyDefaultBrandIdValue = this.car_brand;
          
        })
        this.api.getdata('cars/getListYear').subscribe(res=>{
          this.listyear = res;
          this.MyDefaultYearIdValue = this.car_year;
        })
        this.api.getdata('cars/getListCC').subscribe(res=>{
          this.listcc = res;
          this.MyDefaultCCIdValue = this.car_cc;
        })
        this.api.getdata('cars/getListGear').subscribe(res=>{
          this.listgear = res;
          this.MyDefaultGearsIdValue = this.car_gear_id;
        })
        this.api.getdata('cars/getLlistGeneration&brand_id='+this.car_brand).subscribe(res=>{
          this.listgen = res;
          this.MyDefaultGenIdValue = this.car_model;
        })
        this.api.getdata('cars/getListModel&brand_id='+this.car_brand+'&model_id='+this.sub_model).subscribe(res=>{
          this.listmodel = res;
          this.MyDefaultModelIdValue = this.sub_model;
        })
        this.api.getdata('cars/getListFace&brand_id='+this.car_brand+'&model_id='+this.sub_model).subscribe(res=>{
          this.listface = res;
          this.MyDefaultFaceIdValue = this.car_body;
         })
        // let TIME_IN_MS = 2000;
        // let hideFooterTimeout = setTimeout( () => {
        // this.api.getdata('cars/getListFace&brand_id='+this.car_brand2+'&model_id='+this.car_model2).subscribe(res_face=>{
        //   this.listface = res_face;
        //   this.MyDefaultFaceIdValue = this.car_body;
        //  })
        // }, TIME_IN_MS);
        // this.api.getdata('cars/getListModel&brand_id='+this.car_brand1+'&model_id='+this.car_model1).subscribe(res_model=>{
        //     this.listmodel = res_model;
        //     this.MyDefaultModelIdValue = this.sub_model;
        // })
       
        this.api.getdata('cars/getListColor').subscribe(res=>{
          this.listcolor = res;
          this.MyDefaultColorIdValue = this.car_color_id;
        });

        // this.todo.type_id = this.car_type_id;
        // this.todo.year_id = this.car_year;
        // this.todo.cc_id = this.car_cc;
        // this.todo.gear_id = this.car_gear_id;
        // this.todo.color = this.car_color_id;
        // this.todo.brand_id = this.car_brand;
        // this.todo.model_id = this.sub_model;
        // this.todo.generation_id = this.car_model;
        // this.todo.face_id = this.car_body;
        this.todo.mile = this.car_mile;
        this.todo.price = this.car_price;
        this.todo.license = this.car_label;
        this.todo.detail = this.car_detail;
        this.imagesarray = this.car_images;

        
        this.compareWith = this.compareWithFn;
      }
    );
  }
  async getGen($event){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.brand_id = $event.target.value;
    await this.api.getdata('cars/getLlistGeneration&brand_id='+this.brand_id).subscribe(
      res=>{
        this.listgen = res;
      }
    )
    await loading.present();
  }
  async getFace($event){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.model_id = $event.target.value;
    await this.api.getdata('cars/getListModel&brand_id='+this.brand_id+'&model_id='+this.model_id).subscribe(
      ResponseModel=>{
        this.listmodel = ResponseModel;
      }
    );
    await this.api.getdata('cars/getListFace&brand_id='+this.brand_id+'&model_id='+this.model_id).subscribe(
      ResponseFace=>{
        this.listface = ResponseFace;
      }
    );
    await loading.present();
  }

  ngOnInit():void {
    this.todo = new CarEdit();
  }
  
  async editForm(){
    console.log(this.todo);
    this.storage.get('token').then((data)=>{
      this.token = data;
      this.api.getdata('cars/getBand&id='+this.todo.brand_id).subscribe(res=>{
        this.val_brand = res;
        this.api.getdata('cars/getGeneration&id='+this.todo.generation_id).subscribe(res=>{
          this.val_gen = res;
          this.title = this.todo.year_id+" "+this.val_brand.text+" "+this.val_gen.text;

          const formData = new FormData();
          formData.append('token',this.token);
          formData.append('id',this.car_id);
          formData.append('title',this.title);
          formData.append('type_id',this.todo.type_id);
          formData.append('brand_id',this.todo.brand_id);
          formData.append('generation_id',this.todo.generation_id);
          formData.append('face_id',this.todo.face_id);
          formData.append('model_id',this.todo.model_id);
          formData.append('year_id',this.todo.year_id);
          formData.append('cc_id',this.todo.cc_id);
          formData.append('gear_id',this.todo.gear_id);
          formData.append('color',this.todo.color);
          formData.append('mile',this.todo.mile);
          formData.append('license',this.todo.license);
          formData.append('detail',this.todo.detail);
          formData.append('price',this.todo.price);
          formData.append('images',this.imagesarray);


          this.api.postdata('cars/editCar',formData).subscribe(res=>{
              console.log(res);
              if(res.result == "success"){
                this.updateSuccess();
              }else{
              }
            },err=>{
              console.log(err);
            }
          )
        })
      })
    })
  }
  async updateSuccess(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'success',
      message: 'Edit Complete',
    });
    await alert.present();
  }
  async openGallery() {
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     this.updateImages(this.userImg);
     }, (err) => {
     console.log(err);
     })
  }
  async updateImages(images){
    this.imagesarray.push(images);
  }
  async delimages(images){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Image!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.storage.get('token').then((data)=>{
              this.token = data;
              this.api.getdata('cars/delImageCar&token='+this.token+'&id='+this.car_id+'&image='+images).subscribe(
                res=>{
                  console.log(res);
                },err=>{
                  console.log(err);
                }
              )
              // const formData = new FormData();
              // formData.append('token',this.token);
              // formData.append('id',this.car_id);
              // formData.append('image',images);
              // this.api.postdata('cars/delImageCar',formData).subscribe(res=>{
              //   console.log(res);
              // },err=>{
              //   console.log(err);
              // })
            },err=>{
              console.log(err);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
class CarEdit{
  type_id:any;
  brand_id:any;
  generation_id:any;
  face_id:any;
  model_id:any;
  year_id:any;
  cc_id:any;
  gear_id:any;
  mile:any;
  color:any;
  price:any;
  license:any;
  detail:any;
  image:any;
  images:any;
}
