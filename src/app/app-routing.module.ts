import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'car',
    loadChildren: () => import('./car/car.module').then( m => m.CarPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile/announce',
    loadChildren: () => import('./announce/announce.module').then( m => m.AnnouncePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  // {
  //   path: 'news/news-detail',
  //   loadChildren: () => import('./news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  // },
  { //{ path: 'job-detail/:id', loadChildren: './dashboard/job-detail/job-detail.module#JobDetailPageModule' },
    path: 'news/news-detail/:id',
    loadChildren: () => import('./news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  },
  {
    path: 'chat-detail',
    loadChildren: () => import('./chat-detail/chat-detail.module').then( m => m.ChatDetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'carall',
  //   loadChildren: () => import('./carall/carall.module').then( m => m.CarallPageModule)
  // },
  {
    path: 'carall/:id/:brand/:type',
    loadChildren: () => import('./carall/carall.module').then( m => m.CarallPageModule)
  },
  {
    path: 'carall/:id',
    loadChildren: () => import('./carall/carall.module').then( m => m.CarallPageModule)
  },
  {
    path: 'carall/:id/:brand/:type/searchcar',
    loadChildren: () => import('./searchcar/searchcar.module').then( m => m.SearchcarPageModule)
  },
  {
    path: 'carall/:id/:brand/:type/car-add',
    loadChildren: () => import('./car-add/car-add.module').then( m => m.CarAddPageModule)
  },
  {
    path: 'home/car-add',
    loadChildren: () => import('./car-add/car-add.module').then( m => m.CarAddPageModule)
  },
  {
    path: 'profile/announce/car-add',
    loadChildren: () => import('./car-add/car-add.module').then( m => m.CarAddPageModule)
  },
  {
    path: 'car-add',
    loadChildren: () => import('./car-add/car-add.module').then( m => m.CarAddPageModule)
  },
  {
    path: 'profile/announce/edit/:id',
    loadChildren: () => import('./car-edit/car-edit.module').then( m => m.CarEditPageModule)
  },
  {
    path: 'car-detail',
    loadChildren: () => import('./car-detail/car-detail.module').then( m => m.CarDetailPageModule)
  },
  {
    path: 'carall/:id/:brand/:type/car-detail/:id',
    loadChildren: () => import('./car-detail/car-detail.module').then( m => m.CarDetailPageModule)
  },
  {
    path: 'profile/favorites/car-detail/:id',
    loadChildren: () => import('./car-detail/car-detail.module').then( m => m.CarDetailPageModule)
  },
  {
    path: 'profile/save/car-detail/:id',
    loadChildren: () => import('./car-detail/car-detail.module').then( m => m.CarDetailPageModule)
  },
  {
    path: 'car-detail/:id',
    loadChildren: () => import('./car-detail/car-detail.module').then( m => m.CarDetailPageModule)
  },
  {
    path: 'profile/favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'favorites/:id',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'profile/help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'profile/profile-setting',
    loadChildren: () => import('./profile-setting/profile-setting.module').then( m => m.ProfileSettingPageModule)
  },
  {
    path: 'profile/save',
    loadChildren: () => import('./save/save.module').then( m => m.SavePageModule)
  },
  {
    path: 'save/:id',
    loadChildren: () => import('./save/save.module').then( m => m.SavePageModule)
  },
  {
    path: 'profile/special-service',
    loadChildren: () => import('./special-service/special-service.module').then( m => m.SpecialServicePageModule)
  },
  {
    path: 'profile/special-service/buy-service',
    loadChildren: () => import('./buy-service/buy-service.module').then( m => m.BuyServicePageModule)
  },
  {
    path: 'promote/:id',
    loadChildren: () => import('./promote/promote.module').then( m => m.PromotePageModule)
  },
  {
    path: 'favorites-del/:id',
    loadChildren: () => import('./favorites-del/favorites-del.module').then( m => m.FavoritesDelPageModule)
  },
  {
    path: 'favorites-add/:id',
    loadChildren: () => import('./favorites-add/favorites-add.module').then( m => m.FavoritesAddPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-company',
    loadChildren: () => import('./register-company/register-company.module').then( m => m.RegisterCompanyPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'home/filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
