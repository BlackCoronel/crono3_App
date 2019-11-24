import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab2Page } from './tab2.page';
import {PruebasService} from '../pruebas-service';
import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: Tab2Page}]),
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page],
  providers: [PruebasService]
})
export class Tab2PageModule {}
