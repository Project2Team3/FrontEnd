import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HomePageComponent } from './components/home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path:"",
    component:StartPageComponent
  },
  {
    path:"homePage",
    component:HomePageComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    StartPageComponent,
    RegisterComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule
    ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
