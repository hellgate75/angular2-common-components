
// Providers
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import { RouterModule } from '@angular/router';

// Components
import { WelcomeComponent, UnAuthotorizedComponent, LoginComponent, UserStatusComponent, PageNotFoundComponent,
  FilterBoxComponent, SortingBoxComponent, SortingBoxItemComponent, EditDialogComponent, EditFormComponent,
  EditElementComponent, PagingBoxComponent, ItemListComponent, NavigationBarComponent
} from './lib/components/components';

// Services
import {CanActivateLoginGuard} from "./lib/guards/login.guards";
import {CanActivateViaAuthGuard} from "./lib/guards/activation.guards";
import {GenericDialogComponent} from "./lib/components/dialog/dialog-component";


/*
export function TranslateServiceFactory(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}
*/


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
      RouterModule
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
      GenericDialogComponent
  ]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [
          CanActivateLoginGuard,
          CanActivateViaAuthGuard
      ]
    };
  }
}
