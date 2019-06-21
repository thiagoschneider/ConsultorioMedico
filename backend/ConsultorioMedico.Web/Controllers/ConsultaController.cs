using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Dominio.Servicos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConsultorioMedico.Web.Controllers
{

    [Produces("application/json")]
    [Route("api/consultas")]
    public class ConsultaController : Controller
    {
        private readonly IConsultaServico _consultaServico;
        public ConsultaController(IConsultaServico consultaServico)
        {
            try
            {
                _consultaServico = consultaServico;
            }
            catch (Exception e)
            {
                throw;
            }
        }


        [HttpGet("all")]
        public IEnumerable<Consulta> GetTodos()
        {
            try
            {
                var lista = _consultaServico.ConsultarConsulta();
                return lista;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpPost, Route("criar")]
        public IActionResult Post([FromBody]Consulta consulta)
        {
            try
            {
                consulta.DataHoraInicio = Convert.ToDateTime(consulta.DataString);
                consulta.DataHoraFinal = Convert.ToDateTime(consulta.DataString);

                DateTime dtInicio = new DateTime(consulta.DataHoraInicio.Year, consulta.DataHoraInicio.Month, consulta.DataHoraInicio.Day, Convert.ToInt32(consulta.HoraInicioString.Substring(0, 2)), Convert.ToInt32(consulta.HoraInicioString.Substring(3, 2)), 0);
                consulta.DataHoraInicio = dtInicio;

                DateTime dtFim = new DateTime(consulta.DataHoraFinal.Year, consulta.DataHoraFinal.Month, consulta.DataHoraFinal.Day, Convert.ToInt32(consulta.HoraFinalString.Substring(0, 2)), Convert.ToInt32(consulta.HoraFinalString.Substring(3, 2)), 0);
                consulta.DataHoraFinal = dtFim;

                _consultaServico.AdicionarConsulta(consulta);
                return Ok(consulta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        // GET api/values/5
        [HttpGet("getid/{id}")]
        public Consulta GetById(int id)
        {
            Consulta c = _consultaServico.GetById(id);
            return c;
        }


        [HttpPut("alterar/{id}")]
        public IActionResult AlterarConsulta(long id, [FromBody]Consulta consulta)
        {
            try
            {
                consulta.DataHoraInicio = Convert.ToDateTime(consulta.DataString);
                consulta.DataHoraFinal = Convert.ToDateTime(consulta.DataString);

                DateTime dtInicio = new DateTime(consulta.DataHoraInicio.Year, consulta.DataHoraInicio.Month, consulta.DataHoraInicio.Day, Convert.ToInt32(consulta.HoraInicioString.Substring(0, 2)), Convert.ToInt32(consulta.HoraInicioString.Substring(3, 2)), 0);
                consulta.DataHoraInicio = dtInicio;

                DateTime dtFim = new DateTime(consulta.DataHoraFinal.Year, consulta.DataHoraFinal.Month, consulta.DataHoraFinal.Day, Convert.ToInt32(consulta.HoraFinalString.Substring(0, 2)), Convert.ToInt32(consulta.HoraFinalString.Substring(3, 2)), 0);
                consulta.DataHoraFinal = dtFim;

                Consulta con = _consultaServico.AlterarConsulta(consulta);
                return Ok(con);
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
                Consulta consulta = _consultaServico.GetById(id);
                _consultaServico.RemoverConsulta(consulta);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}