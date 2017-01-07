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
  EditElementComponent, PagingBoxComponent } from './components/components';

// Services
import { AuthService , BackEndService } from './services/services';


// Services
import { Utils, SESSION_KEY } from './utils/utils';
import {USER_BIND_SESSION_KEY} from './shared/constants';

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
  PagingBoxComponent
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
    PagingBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: Utils, useClass: Utils},
    {provide: BackEndService, useClass: BackEndService},
    {provide: AuthService, useClass: AuthService},
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: USER_BIND_SESSION_KEY, useValue: SESSION_KEY}
  ]
})
export class LibModule { }
