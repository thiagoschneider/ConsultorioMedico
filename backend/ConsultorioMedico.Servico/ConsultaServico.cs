using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Dominio.Repositorios;
using ConsultorioMedico.Dominio.Servicos;
using ConsultorioMedico.Infra.Data.Transacoes;
using System.Collections.Generic;

namespace ConsultorioMedico.Servico
{
    public class ConsultaServico : ConsultorioMedico.Servico.Common.Servico, IConsultaServico
    {
        private readonly IConsultaRepositorio _repositorio;

        public ConsultaServico(IConsultaRepositorio repositorio,
            IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repositorio = repositorio;
        }

        public IEnumerable<Consulta> ConsultarConsulta()
        {
            return _repositorio.ConsultarConsultas();
        }

        public Consulta AdicionarConsulta(Consulta c)
        {
            Consulta consu = _repositorio.AdicionarConsulta(c);
            Commit();
            return consu;
        }

        public Consulta AlterarConsulta(Consulta c)
        {
            Consulta consu = _repositorio.AlterarConsulta(c);
            Commit();
            return consu;
        }

        public Consulta GetById(int id)
        {
            return _repositorio.GetByIdConsulta(id);
        }

        public void RemoverConsulta(Consulta c)
        {
            _repositorio.RemoverConsulta(c);
            Commit();
        }

    }
}
