import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Pruebas} from './pruebas.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Resultado} from './tab2/resultado.model';

export class PruebasService {

    private pruebasUrl;

    constructor(private http: HttpClient) {
        this.pruebasUrl = environment.apiUrl;
    }

    public getPruebas(): Observable<Pruebas[]> {
        return this.http.get(this.pruebasUrl).pipe(map(pruebas => pruebas as Pruebas[]));
    }

    public getResultadosByDorsal(data: any) {
        return this.http.post(this.pruebasUrl + '/resultado', data).pipe(map(resultado => resultado as Resultado[]));
    }
}
