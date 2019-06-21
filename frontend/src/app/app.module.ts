import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConsultaComponent } from './consulta/consulta.component';
import { PacienteModalComponent } from './paciente-modal/paciente-modal.component';
import { PacienteRemoverModalComponent } from './paciente-remover-modal/paciente-remover-modal.component';
import { ConsultaModalComponent } from './consulta-modal/consulta-modal.component';
import { ConsultaRemoverModalComponent } from './consulta-remover-modal/consulta-remover-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    PacienteComponent,
    ConsultaComponent,
    PacienteModalComponent,
    PacienteRemoverModalComponent,
    ConsultaModalComponent,
    ConsultaRemoverModalComponent,
  ],
  entryComponents: [PacienteModalComponent,PacienteRemoverModalComponent,ConsultaModalComponent,ConsultaRemoverModalComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
