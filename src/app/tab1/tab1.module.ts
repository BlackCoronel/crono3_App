import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {PruebasService} from '../pruebas-service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LaunchNavigator} from '@ionic-native/launch-navigator/ngx';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
  ],
  declarations: [Tab1Page],
  providers: [
      PruebasService,
      InAppBrowser,
      Geolocation,
      LaunchNavigator
  ]
})
export class Tab1PageModule {}
