import {Component} from '@angular/core';
import {PruebasService} from '../pruebas-service';
import {Pruebas} from '../pruebas.model';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    public pruebas = [] as Pruebas[];

    constructor(private pruebasService: PruebasService,
                private toastController: ToastController,
                private inAppBrowser: InAppBrowser,
                private alertController: AlertController,
                private loadingController: LoadingController) {
    }

    public ionViewDidEnter() {
        this.getPruebasDisponibles();
    }

    public getPruebasDisponibles() {
        this.pruebasService.getProximasPruebas().subscribe(pruebas => {
            this.pruebas = pruebas;
        });
    }

    public navegarUrlPrueba(url: string) {
        if (url !== null) {
            this.inAppBrowser.create(url);
        } else {
            this.noUrlFoundToast();
        }
    }

    async navegarUbicacionPrueba(localizacion: string) {
        const loadingRef = await this.loadingController.create({
            message: 'Calculando la ruta...',
            spinner: 'bubbles'
        });

        loadingRef.present();
    }

    async noUrlFoundToast() {
        const toaster = await this.toastController.create({
            message: 'No se ha encontrado una url para la prueba.',
            duration: 2000,
            position: 'bottom',
            color: 'dark'
        });
        toaster.present();
    }

    async accionesAlert(url: string, localizacion: string) {
        const alert = await this.alertController.create({
            header: '¿Qué desea realizar?',
            message: 'Seleccione una de las opciones que se muestran a continuación...',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                },
                {
                    text: 'Consultar',
                    handler: () => {
                        this.navegarUrlPrueba(url);
                    }
                },
                {
                    text: 'Navegar',
                    handler: () => {
                        this.navegarUbicacionPrueba(localizacion);
                    }
                },
            ]
        });

        await alert.present();
    }
}
