
// Providers
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

// Components
import { WelcomeComponent, UnAuthotorizedComponent, LoginComponent, UserStatusComponent, PageNotFoundComponent,
  FilterBoxComponent, SortingBoxComponent, SortingBoxItemComponent, EditDialogComponent, EditFormComponent,
  EditElementComponent, PagingBoxComponent, ItemListComponent, NavigationBarComponent } from './lib/components/components';

// Services
import { AuthService , BackEndService } from './lib/services/services';


// Services
import { Utils } from './lib/utils/utils';
import {
  USER_BIND_UTILS_OBJECT, USER_BIND_BACKEND_SERVICE,
  USER_BIND_AUTH_SERVICE
} from './lib/shared/constants';

export const LIB_MODULE_DECLARATIONS = [
  WelcomeComponent,
  UnAuthotorizedComponent,
  LoginComponent,
  UserStatusComponent,
  PageNotFoundComponent,
  FilterBoxComponent,
  SortingBoxComponent,
  SortingBoxItemComponent,
  EditDialogComponent,
  EditFormComponent,
  EditElementComponent,
  PagingBoxComponent,
  ItemListComponent,
  NavigationBarComponent
];

@NgModule({
  declarations: [
    WelcomeComponent,
    UnAuthotorizedComponent,
    LoginComponent,
    UserStatusComponent,
    PageNotFoundComponent,
    FilterBoxComponent,
    SortingBoxComponent,
    SortingBoxItemComponent,
    EditDialogComponent,
    EditFormComponent,
    EditElementComponent,
    PagingBoxComponent,
    ItemListComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  exports: [
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: USER_BIND_UTILS_OBJECT, useClass: Utils},
    {provide: USER_BIND_BACKEND_SERVICE, useClass: BackEndService},
    {provide: USER_BIND_AUTH_SERVICE, useClass: AuthService},
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class LibModule { }
