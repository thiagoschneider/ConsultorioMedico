using ConsultorioMedico.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultorioMedico.Dominio.Repositorios
{
    public interface IConsultaRepositorio
    {
        IEnumerable<Consulta> ConsultarConsultas();
        Consulta AdicionarConsulta(Consulta consulta);
        void RemoverConsulta(Consulta c);
        Consulta AlterarConsulta(Consulta c);
        Consulta GetByIdConsulta(int idConsulta);

    }
}
