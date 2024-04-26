import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NgProgressModule } from "ngx-progressbar";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './core/interceptor/http.interceptor';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './core/store/app/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './core/store/users/users.effect';
import { UserDetailEffects } from './core/store/user-detail/user-detail.effect';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule.withConfig({
      spinnerPosition: "left",
      color: "#ed1c24",
    }),
    NgProgressHttpModule,
    StoreModule.forRoot(fromApp.appReducer, {
      metaReducers: fromApp.metaReducers,
    }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([
      UsersEffects,
      UserDetailEffects,
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
