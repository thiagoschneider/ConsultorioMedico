using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Dominio.Servicos;
using ConsultorioMedico.Infra.Data.Persistencia.Contexto;
using ConsultorioMedico.Infra.Data.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace ConsultorioMedico.Web.Controllers
{

    [Produces("application/json")]
    [Route("api/pacientes")]
    //[Route("api/")]
    public class PacienteController : Controller
    {
        private readonly IPacienteServico _pacienteServico;
        public PacienteController(IPacienteServico pacienteServico)
        {
            try
            {
                _pacienteServico = pacienteServico;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpGet("all")]
        public IEnumerable<Paciente> GetTodos()
        {
            try
            {
                var lista = _pacienteServico.ConsultarPacientes();
                return lista;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpPost, Route("criar")]
        public IActionResult Post([FromBody]Paciente paciente)
        {
            try
            {
                paciente.DataNascimento = Convert.ToDateTime(paciente.DataNascimentoString);
                _pacienteServico.AdicionarPaciente(paciente);
                paciente.DataNascimentoString = paciente.DataNascimento.ToString("dd/MM/yyyy");
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        // GET api/values/5
        [HttpGet("getid/{id}")]
        public Paciente GetById(int id)
        {
            return _pacienteServico.GetById(id);
        }


        [HttpPut("alterar/{id}")]
        public IActionResult AlterarPaciente(long id, [FromBody]Paciente paciente)
        {
            try
            {
                 paciente.DataNascimento = Convert.ToDateTime(paciente.DataNascimentoString);
                _pacienteServico.AlterarPaciente(paciente);
                paciente.DataNascimentoString = paciente.DataNascimento.ToString("dd/MM/yyyy");
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //[HttpDelete("{id}")]
        [HttpDelete("excluir/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Paciente paciente = _pacienteServico.GetById(id);
                _pacienteServico.RemoverPaciente(paciente);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}