import {Component} from '@angular/core';
import {PruebasService} from '../pruebas-service';
import {Pruebas} from '../pruebas.model';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    public pruebas = [] as Pruebas[];

    constructor(private pruebasService: PruebasService,
                private toastController: ToastController) {
    }

    public ionViewDidEnter() {
        this.getPruebasDisponibles();
    }

    public getPruebasDisponibles() {
        this.pruebasService.getProximasPruebas().subscribe(pruebas => {
            this.pruebas = pruebas;
        });
    }

    async navegarPrueba(url: string) {
        if (url !== null) {
            window.open(url, '_system');
        } else {
            const toaster = await this.toastController.create({
                message: 'No se ha encontrado una url para la prueba.',
                duration: 2000,
                position: 'bottom',
                color: 'dark'
            });
            toaster.present();
        }
    }
}
