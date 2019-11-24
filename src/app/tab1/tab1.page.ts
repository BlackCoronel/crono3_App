import {Component} from '@angular/core';
import {PruebasService} from '../pruebas-service';
import {Pruebas} from '../pruebas.model';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    public pruebas = [] as Pruebas[];

    constructor(private pruebasService: PruebasService) {
    }

    public ionViewDidEnter() {
        this.getPruebasDisponibles();
    }

    public getPruebasDisponibles() {
        this.pruebasService.getPruebas().subscribe(pruebas => {
            this.pruebas = pruebas;
        });
    }

}
