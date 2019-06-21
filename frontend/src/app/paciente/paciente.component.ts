import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../model/paciente.model';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteModalComponent } from '../paciente-modal/paciente-modal.component';
import { PacienteRemoverModalComponent } from '../paciente-remover-modal/paciente-remover-modal.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})


export class PacienteComponent implements OnInit {
  pacientes: any[] = [];
  pacientesForm: FormGroup;

  modalReference: NgbModalRef;


  constructor(private modalService: NgbModal,
    private pService: PacienteService,
    private formBuilder: FormBuilder) { }

  open(content, isEditing, event) {
    this.modalReference = this.modalService.open(PacienteModalComponent);
    if (isEditing) {

      this.pService.GetByIdPaciente(event.target.dataset.id).subscribe(response => {
        // this.modalReference.componentInstance.paciente = response;
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

        this.pacientes.push(result);
      } else {
        this.pacientes.forEach(a => {
          if (a.pacienteId == result.pacienteId) {
            a.nome = result.nome;
            a.dataNascimentoString = result.dataNascimentoString;
          }
        });
      }
    }, reason => {

    });
  }

  ngOnInit() {
    //this.pacientesForm = this.formBuilder.group({ Nome: ['', Validators.required], DataNascimentoString: ['', Validators.required], PacienteId: [''] });
    this.load();
  }

  load() {
    this.pService.GetPacienteAll().subscribe(p => {
      this.pacientes = p;
    });
  }

  openRemoverPaciente(event) {
    this.modalReference = this.modalService.open(PacienteRemoverModalComponent);
    setTimeout(() => {
      this.pService.eventRemover.emit(event.target.dataset.id);
    }, 300);
    this.modalReference.result.then((result) => {
      if (!result)
        return;
      this.pacientes = this.pacientes.filter(pacien => {
        return pacien.pacienteId != result;
      })
    }, reason => {

    });
  }
}