import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PruebasService} from '../pruebas-service';
import {Pruebas} from '../pruebas.model';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public resultadosForm: FormGroup;
    public pruebas = [] as Pruebas[];

    constructor(private formBuilder: FormBuilder,
                private pruebasService: PruebasService) {
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
            console.log(resultado);
        });
    }
}
