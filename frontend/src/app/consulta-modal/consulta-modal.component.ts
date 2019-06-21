import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../model/paciente.model';
import { Consulta } from '../model/consulta.model';
import { ConsultaService } from '../services/consulta.service';
import * as moment from 'moment';
//import Moment from 'moment';
import { extendMoment } from 'moment-range';

@Component({
  selector: 'app-consulta-modal',
  templateUrl: './consulta-modal.component.html',
  styleUrls: ['./consulta-modal.component.css']
})
export class ConsultaModalComponent implements OnInit {
  consultasForm: FormGroup;
  modalReference: NgbModalRef;
  @Input() public consultas: any[];
  time = { hour: 13, minute: 30 };
  consulta: Consulta = new Consulta();
  pacientes: Paciente[] = [];
  momentJs = extendMoment(moment);

  constructor(private modalService: NgbModal,
    private pService: ConsultaService,
    private pServicePaciente: PacienteService,
    private formBuilder: FormBuilder,
    private active: NgbActiveModal
  ) {
    this.pServicePaciente.GetPacienteAll().subscribe(p => {
      this.pacientes = p;
    });
  }

  ngOnInit() {
    this.consultasForm = this.formBuilder.group({ Observacoes: ['', Validators.required], Data: ['', Validators.required], HoraInicio: ['', Validators.required], HoraFinal: ['', Validators.required], ConsultaId: [''], PacienteId: ['', Validators.required] });

    this.pService.event.subscribe(response => {

      this.consultasForm.controls['PacienteId'].setValue(response.pacienteId);
      this.consultasForm.controls['ConsultaId'].setValue(response.consultaId);
      this.consultasForm.controls['Observacoes'].setValue(response.observacoes);

      this.consultasForm.controls['Data'].setValue({
        year: parseInt(response.dataHoraInicio.substr(0, 4)),
        month: parseInt(response.dataHoraInicio.substr(5, 2)),
        day: parseInt(response.dataHoraInicio.substr(8, 2))
      });

      this.consultasForm.controls['HoraInicio'].setValue({
        hour: parseInt(response.dataHoraInicio.substr(11, 2)),
        minute: parseInt(response.dataHoraInicio.substr(14, 2)),
        second: 0
      });

      this.consultasForm.controls['HoraFinal'].setValue({
        hour: parseInt(response.dataHoraFinal.substr(11, 2)),
        minute: parseInt(response.dataHoraFinal.substr(14, 2)),
        second: 0
      });
    });
  }


  formatarHora(dataHoraInicio, dataHoraFinal) {


    let arrayHoraInicio = dataHoraInicio.split(' ');
    let arrayHoraFinal = dataHoraFinal.split(' ');
    let arrayHoraInicioDetalhe = arrayHoraInicio[1].split(':');
    let arrayHoraFinalDetalhe = arrayHoraFinal[1].split(':');

    if (arrayHoraInicioDetalhe[0].toString().length == 1) {
      arrayHoraInicioDetalhe[0] = "0" + arrayHoraInicioDetalhe[0];
    }

    if (arrayHoraFinalDetalhe[0].toString().length == 1) {
      arrayHoraFinalDetalhe[0] = "0" + arrayHoraFinalDetalhe[0];
    }

    if (arrayHoraInicioDetalhe[1].toString().length == 1) {
      arrayHoraInicioDetalhe[1] = "0" + arrayHoraInicioDetalhe[1];
    }

    if (arrayHoraFinalDetalhe[1].toString().length == 1) {
      arrayHoraFinalDetalhe[1] = "0" + arrayHoraFinalDetalhe[1];
    }

    let horaInicio = arrayHoraInicioDetalhe[0];
    let minutoInicio = arrayHoraInicioDetalhe[1];

    let horaFinal = arrayHoraFinalDetalhe[0];
    let minutoFinal = arrayHoraFinalDetalhe[1];

    let horaInicioRetorno = { hour: horaInicio, minute: minutoInicio };
    let horaFinalRetorno = { hour: horaFinal, minute: minutoFinal };

    return { horaInicioRetorno, horaFinalRetorno }
  }
  formatarData(data) {

    let day = data.substr(0, 2);
    let month = data.substr(3, 2);
    let year = data.substr(6, 4);

    return { day: parseInt(day), month: parseInt(month), year: parseInt(year) }
  }

  criarIntervalos(dataInicial, dataFinal) {

    let data = this.formatarData(dataInicial);
    let hora = this.formatarHora(dataInicial, dataFinal);
    let dataInicialIntervalo = data.year + "-" + data.month + "-" + data.day + " " + hora.horaInicioRetorno.hour + ":" + hora.horaInicioRetorno.minute + ":00";
    let dataFinalIntervalo = data.year + "-" + data.month + "-" + data.day + " " + hora.horaFinalRetorno.hour + ":" + hora.horaFinalRetorno.minute + ":00";

    let start = this.momentJs(dataInicialIntervalo);
    let end = this.momentJs(dataFinalIntervalo);
    let range = this.momentJs.range(start, end);
    return range;
  }

  criarUnicaData(dataInicial, dataFinal) {

    let data = this.formatarData(dataInicial);
    let hora = this.formatarHora(dataInicial, dataFinal);
    let dataInicialIntervalo = data.year + "-" + data.month + "-" + data.day + " " + hora.horaInicioRetorno.hour + ":" + hora.horaInicioRetorno.minute + ":00";
    let dataFinalIntervalo = data.year + "-" + data.month + "-" + data.day + " " + hora.horaFinalRetorno.hour + ":" + hora.horaFinalRetorno.minute + ":00";

    let start = this.momentJs(dataInicialIntervalo);
    let end = this.momentJs(dataFinalIntervalo);
    let range = this.momentJs.range(start, end);
    return range;
  }

  montarData(horaIni, horaFim, data) {
    if (data.day.toString().length == 1) {
      data.day = "0" + data.day;
    }
    if (data.month.toString().length == 1) {
      data.month = "0" + data.month;
    }

    let dataInicial = data.day + "/" + data.month + "/" + data.year + " " + horaIni.hour + ":" + horaIni.minute + ":00";
    let dataFinal = data.day + "/" + data.month + "/" + data.year + " " + horaFim.hour + ":" + horaFim.minute + ":00";
    return { dataInicial, dataFinal };
  }

  cadastrar() {
    if (this.consultasForm.value.HoraInicio.hour > this.consultasForm.value.HoraFinal.hour ||
      (this.consultasForm.value.HoraInicio.hour == this.consultasForm.value.HoraFinal.hour &&
        this.consultasForm.value.HoraInicio.minute > this.consultasForm.value.HoraFinal.minute)
    ) {
      //this.consultasForm.controls['HoraInicio'].setErrors({ 'incorrect': true });
      alert('Hora Inicio maior que a Hora Fim');
      return;
    }   

    let value = this.consultasForm.value;
    let dt;
    let hr;

    let consultasExistentes = this.consultas.filter(c => {
      dt = this.formatarData(c.dataHoraInicioString);
      hr = this.formatarHora(c.dataHoraInicioString, c.dataHoraFinalString);
      let isSameDate = dt.day == value.Data.day && dt.month == value.Data.month && dt.year == value.Data.year;
      let isSameHourInicio = hr.horaInicioRetorno.hour == value.HoraInicio.hour && hr.horaInicioRetorno.minute == value.HoraInicio.minute;
      let isSameHourFinal = hr.horaFinalRetorno.hour == value.HoraFinal.hour && hr.horaFinalRetorno.minute == value.HoraFinal.minute;
      let range = this.criarIntervalos(c.dataHoraInicioString, c.dataHoraFinalString);
      let datasFormatadas = this.montarData(value.HoraInicio, value.HoraFinal, value.Data);
      let rangeForm = this.criarIntervalos(datasFormatadas.dataInicial, datasFormatadas.dataFinal);

      //console.log(rangeForm);
      return (isSameDate && isSameHourInicio && isSameHourFinal) || (isSameDate && isSameHourInicio) || range.contains(rangeForm) || range.contains(rangeForm.start);
    });

    if (consultasExistentes.length > 0) {
      this.consultasForm.controls['HoraInicio'].setErrors({ 'incorrect': true });
      alert('Ja existe consulta marcada nesse intervalo de horario');
    } else {
      this.consultasForm.controls['HoraInicio'].setErrors(null);
    }

    if (this.consultasForm.valid) {
      let con = Object.assign({}, this.consulta, this.consultasForm.value);

      let data = this.consultasForm.value.Data;
      con.DataString = data.day + '/' + data.month + "/" + data.year;
      let iniHour = this.consultasForm.value.HoraInicio.hour.toString().length == 1 ? "0" + this.consultasForm.value.HoraInicio.hour : this.consultasForm.value.HoraInicio.hour;
      let iniMin = this.consultasForm.value.HoraInicio.minute.toString().length == 1 ? "0" + this.consultasForm.value.HoraInicio.minute : this.consultasForm.value.HoraInicio.minute;

      let finalHour = this.consultasForm.value.HoraFinal.hour.toString().length == 1 ? "0" + this.consultasForm.value.HoraFinal.hour : this.consultasForm.value.HoraFinal.hour;
      let finalMin = this.consultasForm.value.HoraFinal.minute.toString().length == 1 ? "0" + this.consultasForm.value.HoraFinal.minute : this.consultasForm.value.HoraFinal.minute;

      con.HoraInicioString = iniHour + ":" + iniMin;
      con.HoraFinalString = finalHour + ":" + finalMin;
      delete con.Data;

      if (this.consultasForm.value.ConsultaId) {
        this.pService.AlterarConsulta(con).subscribe(response => {
          alert('Alterado com sucesso!');
          response.isEditing = true;
          this.active.close(response);
        },
          error => {
            throw error;
          });
      } else {
        con.ConsultaId = 0;
        this.pService.CreateConsulta(con).subscribe(response => {
          alert('Cadastrado com sucesso!');
          console.log(con);
          this.active.close(response);
        },
          error => {
            throw error;
          });
      }
    }
    this.consultasForm.controls['HoraInicio'].setErrors(null);
  }

  fecharModal() {
    this.active.close()
  }

}
