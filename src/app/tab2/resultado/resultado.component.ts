import {Component, OnInit} from '@angular/core';
import {Resultado} from '../resultado.model';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-resultado',
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent {

    public resultado: Resultado;

    constructor(private modalController: ModalController) {
    }

    public ionDidViewEnter() {

    }

    private closeModal() {
        this.modalController.dismiss();
    }
}
