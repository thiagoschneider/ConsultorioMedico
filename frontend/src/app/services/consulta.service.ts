import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../model/paciente.model';
import { Consulta } from '../model/consulta.model';


@Injectable()
export class ConsultaService {
    url = 'https://localhost:44328/api/consultas/';
    public event = new EventEmitter();
    public eventRemover = new EventEmitter();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    constructor(
        private httpClient: HttpClient,
    ) { }

  
    GetConsultaAll(): Observable<Consulta[]> {
        return this.httpClient.get<Consulta[]>(this.url + 'all');
    }

    CreateConsulta(consulta: Consulta): Observable<Consulta> {
        return this.httpClient.post<Consulta>(this.url + 'criar', JSON.stringify(consulta), this.httpOptions);
    }

    AlterarConsulta(consulta: Consulta): Observable<any> {
        return this.httpClient.put<any>(this.url + `alterar/${consulta.ConsultaId}`, JSON.stringify(consulta), this.httpOptions);
    }

    DeleteConsulta(id: number): Observable<string> {
        return this.httpClient.delete<string>(this.url + `excluir/${id}`);
    }

    GetByIdConsulta(id: number): Observable<Consulta> {
        return this.httpClient.get<Consulta>(this.url + `getid/${id}`);
    }
}
