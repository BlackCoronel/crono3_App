import {IonicModule, ModalController} from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab2Page } from './tab2.page';
import {PruebasService} from '../pruebas-service';
import {IonicSelectableModule} from 'ionic-selectable';
import {ResultadoComponent} from './resultado/resultado.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: Tab2Page}]),
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page, ResultadoComponent],
  providers: [
      PruebasService,
      ModalController
  ],
  entryComponents: [ResultadoComponent]
})
export class Tab2PageModule {}
