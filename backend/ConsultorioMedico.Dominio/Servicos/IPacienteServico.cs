using ConsultorioMedico.Dominio.Entidades;
using System.Collections.Generic;

namespace ConsultorioMedico.Dominio.Servicos
{
    public interface IPacienteServico
    {
        IEnumerable<Paciente> ConsultarPacientes();
        void AdicionarPaciente(Paciente p);

        Paciente GetById(int idPaciente);
        void AlterarPaciente(Paciente p);
        void RemoverPaciente(Paciente p);
    }
}
