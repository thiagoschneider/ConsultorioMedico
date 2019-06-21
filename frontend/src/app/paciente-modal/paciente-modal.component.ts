import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../model/paciente.model';

@Component({
  selector: 'app-paciente-modal',
  templateUrl: './paciente-modal.component.html',
  styleUrls: ['./paciente-modal.component.css']
})
export class PacienteModalComponent implements OnInit {
  pacientesForm: FormGroup;
  modalReference: NgbModalRef;
 
  paciente: Paciente = new Paciente();


  constructor(private modalService: NgbModal,
    private pService: PacienteService,
    private formBuilder: FormBuilder,
    private active: NgbActiveModal
  ) { }

  ngOnInit() {

    this.pacientesForm = this.formBuilder.group({ Nome: ['', Validators.required], DataNascimentoString: ['', Validators.required], PacienteId: [''] });
    
    this.pService.event.subscribe(response => {
      console.log(response);
      this.pacientesForm.controls['Nome'].setValue(response.nome);
  
      this.pacientesForm.controls['DataNascimentoString'].setValue({
        year: parseInt(response.dataNascimentoString.substr(0, 4)),
        month: parseInt(response.dataNascimentoString.substr(5, 2)),
        day: parseInt(response.dataNascimentoString.substr(8, 2))
      });
      this.pacientesForm.controls['PacienteId'].setValue(response.pacienteId);
     
    });
   

  }

  cadastrar() {
    if (this.pacientesForm.valid) {

      let pac = Object.assign({}, this.paciente, this.pacientesForm.value);

      let data = this.pacientesForm.value.DataNascimentoString;
      pac.DataNascimentoString = data.day + '/' + data.month + "/" + data.year;

      if (this.pacientesForm.value.PacienteId) {
        this.pService.AlterarPaciente(pac).subscribe(response => {
          alert('Alterado com sucesso!');
          response.isEditing = true;
          this.active.close(response);
        },
          error => {
            throw error;
          });
      } else {
        this.pService.CreatePaciente(pac).subscribe(response => {
          alert('Cadastrado com sucesso!');
          console.log(pac);
          this.active.close(response);
        },
          error => {
            throw error;
          });
      }
    }
  }

  fecharModal() {
    this.active.close()
  }

}
