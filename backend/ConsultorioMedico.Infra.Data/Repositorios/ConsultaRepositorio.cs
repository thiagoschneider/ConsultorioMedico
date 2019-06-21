using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Infra.Data.Persistencia.Contexto;
using ConsultorioMedico.Dominio.Repositorios;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ConsultorioMedico.Infra.Data.Repositorios
{
    public class ConsultaRepositorio : IConsultaRepositorio
    {

        private ConsultorioMedicoDbContext _contexto;

        public ConsultaRepositorio(ConsultorioMedicoDbContext contexto)
        {
            _contexto = contexto;
        }

        public IEnumerable<Consulta> ConsultarConsultas()
        {
            return _contexto.Consultas.Include(p => p.Paciente).ToList();
        }
        public Consulta AdicionarConsulta(Consulta c)
        {
            _contexto.Consultas.Add(c);
            c.Paciente = _contexto.Pacientes.FirstOrDefault(s => s.PacienteId == c.PacienteId);
            return c;
        }

        public Consulta AlterarConsulta(Consulta c)
        {
            _contexto.Entry(c).State = EntityState.Modified;
            c.Paciente = _contexto.Pacientes.FirstOrDefault(s => s.PacienteId == c.PacienteId);
            return c;
        }

        public void RemoverConsulta(Consulta c)
        {
            _contexto.Entry(c).State = EntityState.Deleted;
        }
        public Consulta GetByIdConsulta(int idConsulta)
        {
            return _contexto.Consultas.Where(p => p.ConsultaId == idConsulta).FirstOrDefault();
        }
    }
}
