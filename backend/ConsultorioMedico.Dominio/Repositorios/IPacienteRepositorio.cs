using ConsultorioMedico.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultorioMedico.Dominio.Repositorios
{
    public interface IPacienteRepositorio
    {
        IEnumerable<Paciente> ConsultarPacientes();

        void AdicionarPaciente(Paciente p);
        Paciente GetByIdPaciente(int idPaciente);
        void AlterarPaciente(Paciente p);
        void RemoverPaciente(Paciente p);
    }
}
