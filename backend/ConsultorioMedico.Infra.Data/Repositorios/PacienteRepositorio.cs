using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Dominio.Repositorios;
using ConsultorioMedico.Infra.Data.Persistencia.Contexto;
using ConsultorioMedico.Infra.Data.Persistencia.Mapeamento;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsultorioMedico.Infra.Data.Repositorios
{
    public class PacienteRepositorio : IPacienteRepositorio
    {
        private ConsultorioMedicoDbContext _contexto;
        public PacienteRepositorio(ConsultorioMedicoDbContext contexto)
        {
            _contexto = contexto;
        }

        public IEnumerable<Paciente> ConsultarPacientes()
        {
            List<Paciente> lista = _contexto.Pacientes.ToList();
            return lista.Select(s => new Paciente(s.DataNascimento, s.Nome)
            {
                PacienteId = s.PacienteId,
                DataNascimentoString = s.DataNascimento.ToString("dd/MM/yyyy")
            });
        }
        public void AdicionarPaciente(Paciente p)
        {
            _contexto.Pacientes.Add(p);
        }

        public void AlterarPaciente(Paciente p)
        {
            _contexto.Entry(p).State = EntityState.Modified;
        }

        public void RemoverPaciente(Paciente p)
        {
            _contexto.Entry(p).State = EntityState.Deleted;
        }
        public Paciente GetByIdPaciente(int idPaciente)
        {
            Paciente pac = _contexto.Pacientes.Where(p => p.PacienteId == idPaciente).FirstOrDefault();
            pac.DataNascimentoString = pac.DataNascimento.ToString("yyyy-MM-dd");
            return pac;
        }
    }
}
