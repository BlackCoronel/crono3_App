import {Component} from '@angular/core';
import {PruebasService} from '../pruebas-service';
import {Pruebas} from '../pruebas.model';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    public pruebas = [] as Pruebas[];
    private misCoordenadas: string;

    constructor(private pruebasService: PruebasService,
                private toastController: ToastController,
                private inAppBrowser: InAppBrowser,
                private alertController: AlertController,
                private loadingController: LoadingController,
                private geolocation: Geolocation,
                private launchNavigator: LaunchNavigator) {
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

    public navegarUbicacionPrueba(localizacion: string) {
        this.loadingController.create({message: 'Calculando la ruta...', spinner: 'bubbles'}).then(res => {

            if (localizacion !== null) {
                res.present();

                this.getMyPosition();

                const options: LaunchNavigatorOptions = {
                    start: this.misCoordenadas
                };

                this.launchNavigator.navigate(localizacion, options).then(success => {
                    console.log('navegando al destino...');
                }, errorResponse => {
                    res.dismiss();
                });

                res.dismiss();
            } else {
                res.dismiss();
                this.alertMessageSinRuta();
            }
        });
    }

    public getMyPosition() {
        this.geolocation.getCurrentPosition().then(coordenadas => {
            this.misCoordenadas = coordenadas.coords.latitude + ',' + coordenadas.coords.longitude;
        }).catch((error) => {
        });
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
            message: 'Seleccione una de las opciones que se muestran...',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                },
                {
                    text: 'Consultar prueba',
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

    async alertMessageSinRuta() {
        const toaster = await this.toastController.create({
            message: 'No se ha encontrado una ruta de destino válida.',
            duration: 2000,
            position: 'bottom',
            color: 'dark'
        });
        toaster.present();
    }
}
