using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Dominio.Repositorios;
using ConsultorioMedico.Dominio.Servicos;
using ConsultorioMedico.Infra.Data.Transacoes;
using System.Collections.Generic;

namespace ConsultorioMedico.Servico
{
    public class PacienteServico : ConsultorioMedico.Servico.Common.Servico, IPacienteServico
    {
        private readonly IPacienteRepositorio _repositorio;

        public PacienteServico(IPacienteRepositorio repositorio,
            IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repositorio = repositorio;
        }

        public IEnumerable<Paciente> ConsultarPacientes()
        {
            return _repositorio.ConsultarPacientes();
        }

        public void AdicionarPaciente(Paciente p)
        {
            _repositorio.AdicionarPaciente(p);
            Commit();
        }

        public void AlterarPaciente(Paciente p)
        {
            _repositorio.AlterarPaciente(p);
            Commit();
        }

        public Paciente GetById(int id)
        {
            return _repositorio.GetByIdPaciente(id);
        }

        public void RemoverPaciente(Paciente p)
        {
            _repositorio.RemoverPaciente(p);
            Commit();
        }

    }
}
