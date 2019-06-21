import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../model/paciente.model';


@Injectable()
export class PacienteService {
    url = 'https://localhost:44328/api/pacientes/';
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

    GetPacienteAll(): Observable<Paciente[]> {
        return this.httpClient.get<Paciente[]>(this.url + 'all');
    }

    CreatePaciente(pacienteModel: Paciente): Observable<Paciente> {
        let paciente = {Nome:pacienteModel.Nome,DataNascimentoString:pacienteModel.DataNascimentoString}
        return this.httpClient.post<Paciente>(this.url + 'criar', paciente);
        //return this.httpClient.post<Paciente>(this.url + 'criar', JSON.stringify(paciente), this.httpOptions);
    }

    AlterarPaciente(paciente: Paciente): Observable<any> {
        return this.httpClient.put<any>(this.url + `alterar/${paciente.PacienteId}`, JSON.stringify(paciente), this.httpOptions);
    }

    DeletePaciente(id: number): Observable<string> {
        return this.httpClient.delete<string>(this.url + `excluir/${id}`);
    }

    GetByIdPaciente(id: number): Observable<Paciente> {       
        return this.httpClient.get<Paciente>(this.url + `getid/${id}`);
    }
}
