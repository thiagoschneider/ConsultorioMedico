import { Paciente } from './paciente.model';

export class Consulta {
    ConsultaId: number;
    PacienteId: number;
    DataHoraInicio: Date;
    DataHoraFinal: Date;
    Observacoes: string;
    HoraInicioString: string;
    HoraFimString: string;
    DataString: string;
    Paciente: Paciente;
    DataHoraInicioString:string;
    DataHoraFinalString:string

}