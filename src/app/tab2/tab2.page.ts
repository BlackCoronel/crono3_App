import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PruebasService} from '../pruebas-service';
import {Pruebas} from '../pruebas.model';
import {Resultado} from './resultado.model';
import {ModalController, ToastController} from '@ionic/angular';
import {ResultadoComponent} from './resultado/resultado.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public resultadosForm: FormGroup;
    public pruebas = [] as Pruebas[];
    public resultado = [] as Resultado[];

    constructor(private formBuilder: FormBuilder,
                private pruebasService: PruebasService,
                private modalController: ModalController,
                private toastController: ToastController) {
        this.buildForm();
    }

    public ionViewDidEnter() {
        this.getPruebasDisponibles();
    }

    public buildForm() {
        this.resultadosForm = this.formBuilder.group({
            prueba_id: null,
            prueba: null,
            dorsal: null
        });
    }

    public getPruebasDisponibles() {
        this.pruebasService.getPruebas().subscribe(pruebas => {
            this.pruebas = pruebas;
        });
    }

    public selectedPrueba($event) {
        this.resultadosForm.patchValue({
            prueba_id: $event.value.id
        });
    }

    public buscarResultados() {
        this.pruebasService.getResultadosByDorsal(this.resultadosForm.value).subscribe(resultado => {
            this.resultado = resultado;
            if (this.resultado.length > 0) {
                this.abrirResultado(this.resultado);
            } else {
              this.toastMessage();
            }
        });
    }

    async abrirResultado(data: Resultado[]) {
        const modalRef = await this.modalController.create({
            component: ResultadoComponent,
            componentProps: {resultado: data[0]}
        });

        modalRef.onDidDismiss().then(result => {});

        await modalRef.present();
    }

    async toastMessage() {
        const toaster = await this.toastController.create({
            message: 'No se ha encontrado resultado para el dorsal seleccionado.',
            duration: 2000,
            position: 'middle',
            color: 'dark'
        });

        toaster.present();
    }
}
