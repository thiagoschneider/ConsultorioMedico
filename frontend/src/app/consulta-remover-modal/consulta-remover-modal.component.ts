import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Consulta } from '../model/consulta.model';
import { ConsultaService } from '../services/consulta.service';

@Component({
  selector: 'app-consulta-remover-modal',
  templateUrl: './consulta-remover-modal.component.html',
  styleUrls: ['./consulta-remover-modal.component.css']
})
export class ConsultaRemoverModalComponent implements OnInit {

  consultasForm: FormGroup;
  modalReference: NgbModalRef;

  consulta: Consulta = new Consulta();


  constructor(private modalService: NgbModal,
    private pService: ConsultaService,
    private formBuilder: FormBuilder,
    private active: NgbActiveModal
  ) { }

  ngOnInit() {

    this.consultasForm = this.formBuilder.group({ ConsultaId: [''] });

    this.pService.eventRemover.subscribe(response => {
      console.log(response);
      this.consultasForm.controls['ConsultaId'].setValue(response);

    });
  }

  remover() {
  
    this.pService.DeleteConsulta(this.consultasForm.value.ConsultaId).subscribe(response => {
      alert('Excluido com sucesso!');

      this.active.close(response);
    },
      error => {
       
      });
  }

  fecharModal() {
    this.active.close()
  }

}
