// Providers
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

/* tslint:disable */
import { LIB_MODULE_DECLARATIONS, PageNotFoundComponent, UnAuthotorizedComponent,
  WelcomeComponent, LoginComponent, CanActivateLoginGuard, Utils, BackEndService, AuthService, UserStatusComponent,
  FilterBoxComponent, SortingBoxComponent, SortingBoxItemComponent, EditDialogComponent, EditFormComponent,
  EditElementComponent, PagingBoxComponent, ItemListComponent, NavigationBarComponent
  USER_BIND_SESSION_KEY, OBJECT_SERVICE_SERVER_CONF, OBJECT_APPLICATION_CONF} from '../src/index';
/* tslint:enable */
// Components
import { AppComponent } from './components/app.component';
import { AddressBookComponent } from './components/addressbook/app.addressbook.component';

// Components

import { FakeAddressBookService } from './services/fake-address-book-service';

// Config

import { serviceServer, appConfig } from '../src/environments/environment';

import { ServiceServer, AppEnv } from '../src/index';

let SERVICE_SERVER: ServiceServer = <ServiceServer>serviceServer;
let APPLICATION_ENV: AppEnv = <AppEnv>appConfig;

// References
let appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: 'main', component: WelcomeComponent },
  { path: 'login',
    component: LoginComponent,
    canActivate: [
      CanActivateLoginGuard
    ]
  },
  { path: 'unauthorized', component: UnAuthotorizedComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
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
/*
      ...[AppComponent,
      ...LIB_MODULE_DECLARATIONS]
*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateLoginGuard,
    {provide: FakeAddressBookService, useClass: FakeAddressBookService},
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: Utils, useClass: Utils},
    {provide: BackEndService, useClass: BackEndService},
    {provide: AuthService, useClass: AuthService},
    {provide: USER_BIND_SESSION_KEY, useValue: null},
    {provide: OBJECT_SERVICE_SERVER_CONF, useValue: null},
    {provide: OBJECT_APPLICATION_CONF, useValue: APPLICATION_ENV},
    {provide: OBJECT_SERVICE_SERVER_CONF, useValue: SERVICE_SERVER},

  ],
  bootstrap: [AppComponent]
})
export class TestLibModule { }
