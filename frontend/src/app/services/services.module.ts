import { NgModule } from '@angular/core';
import { ConsultaService } from './consulta.service';
import { PacienteService } from './paciente.service';

@NgModule({
    providers: [
        ConsultaService,
        PacienteService
    ],
})
export class ServicesModule { }
