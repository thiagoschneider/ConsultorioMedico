import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [{
  path: '', redirectTo: 'pacientes', pathMatch: 'full'
}, {
  path: 'pacientes', component: PacienteComponent
}, {
  path: 'consultas', component: ConsultaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
