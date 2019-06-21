import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../model/paciente.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente-remover-modal',
  templateUrl: './paciente-remover-modal.component.html',
  styleUrls: ['./paciente-remover-modal.component.css']
})
export class PacienteRemoverModalComponent implements OnInit {
  pacientesForm: FormGroup;
  modalReference: NgbModalRef;

  paciente: Paciente = new Paciente();


  constructor(private modalService: NgbModal,
    private pService: PacienteService,
    private formBuilder: FormBuilder,
    private active: NgbActiveModal
  ) { }

  ngOnInit() {

    this.pacientesForm = this.formBuilder.group({ PacienteId: [''] });

    this.pService.eventRemover.subscribe(response => {
      console.log(response);
      this.pacientesForm.controls['PacienteId'].setValue(response);

    });
  }

  remover() {
  
    this.pService.DeletePaciente(this.pacientesForm.value.PacienteId).subscribe(response => {
      alert('Excluido com sucesso!');

      this.active.close(response);
    },
      error => {
        alert('Existem consultas para esse paciente!');
      });
  }

  fecharModal() {
    this.active.close()
  }

}
