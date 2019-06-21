import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../model/consulta.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaModalComponent } from '../consulta-modal/consulta-modal.component';
import { ConsultaRemoverModalComponent } from '../consulta-remover-modal/consulta-remover-modal.component';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})


export class ConsultaComponent implements OnInit {
  consultas: any[] = [];
  consultasForm: FormGroup;
  modalReference: NgbModalRef;


  constructor(private modalService: NgbModal,
    private pService: ConsultaService,
    private formBuilder: FormBuilder) { }

  open(content, isEditing, event) {

    this.modalReference = this.modalService.open(ConsultaModalComponent);
    this.modalReference.componentInstance.consultas = this.consultas;

    if (isEditing) {

      this.pService.GetByIdConsulta(event.target.dataset.id).subscribe(response => {
        
        this.pService.event.emit(response);
      },
        error => {
          throw error;
        });
    }

    this.modalReference.result.then((result) => {
      if (!result)
        return;
      if (!result.isEditing) {

        this.consultas.push(result);

      } else {
        console.log(result);
        this.consultas.forEach(a => {
          if (a.consultaId == result.consultaId) {
            a.paciente.nome = result.paciente.nome;
            a.dataHoraInicioString = result.dataHoraInicioString;
            a.dataHoraFinalString = result.dataHoraFinalString;
          }
        });
      }
    }, reason => {

    });
  }

  ngOnInit() {
    // this.consultasForm = this.formBuilder.group({ DataHoraInicio: ['', Validators.required], DataNascimentoString: ['', Validators.required], ConsultaId: [''] });
    this.load();
  }

  load() {
    this.pService.GetConsultaAll().subscribe(p => {
      this.consultas = p;

    });
  }

  openRemoverConsulta(event) {
    this.modalReference = this.modalService.open(ConsultaRemoverModalComponent);
    setTimeout(() => {
      this.pService.eventRemover.emit(event.target.dataset.id);
    }, 300);
    this.modalReference.result.then((result) => {
      if (!result)
        return;
      this.consultas = this.consultas.filter(cons => {
        return cons.consultaId != result;
      })
    }, reason => {

    });
  }
}