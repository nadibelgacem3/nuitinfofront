import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';;
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import {JwtInterceptor} from "./core/helpers/jwt.interceptor";
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {ErrorInterceptor} from "./core/helpers/error.interceptor";
import {HttpRequestInterceptorInterceptor} from "./core/helpers/http-request-interceptor.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BoatComponent } from './components/boat/boat.component';
import { SauveesComponent } from './components/sauvees/sauvees.component';
import { SauveteurComponent } from './components/sauveteur/sauveteur.component';

@NgModule({
  declarations: [
    AppComponent,
    BoatComponent,
    SauveesComponent,
    SauveteurComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    ReportsModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
    /*{ provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
