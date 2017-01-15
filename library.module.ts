
// Providers
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
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
import {CanActivateLoginGuard} from "./lib/guards/login.guards";
import {CanActivateViaAuthGuard} from "./lib/guards/activation.guards";
import {GenericDialogComponent} from "./lib/components/dialog/dialog-component";

// Translate Service
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/index';


export function serviceLoadFactory(http: Http) {
  return new BackEndService(http);
}

export function authServiceFactory(service: BackEndService) {
  return new AuthService(service);
}

export const defaultLibModuleRoot = {
    provide: BackEndService,
    useFactory: (http: Http) => new BackEndService(http),
    deps: [Http]
};
export const defaultTranslateModuleRoot = {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
    deps: [Http]
};


@NgModule({
  declarations: [
      WelcomeComponent,
      UnAuthotorizedComponent,
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
      NavigationBarComponent,
      GenericDialogComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      TranslateModule.forRoot(defaultTranslateModuleRoot)
  ],
  exports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      WelcomeComponent,
      UnAuthotorizedComponent,
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
      NavigationBarComponent,
      GenericDialogComponent,
      TranslateModule.forRoot(defaultTranslateModuleRoot)
  ],
    providers: [
        CanActivateLoginGuard,
        CanActivateViaAuthGuard,
        {provide: Utils, useClass: Utils},
        {provide: AuthService, deps: [BackEndService], useFactory: authServiceFactory},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [
          CanActivateLoginGuard,
          CanActivateViaAuthGuard,
          {provide: Utils, useClass: Utils},
          {provide: AuthService, deps: [BackEndService], useFactory: authServiceFactory},
          {provide: BackEndService, deps: [Http], useFactory: serviceLoadFactory}
      ]
    };
  }
}
