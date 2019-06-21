using ConsultorioMedico.Dominio.Entidades;
using System.Collections.Generic;

namespace ConsultorioMedico.Dominio.Servicos
{
    public interface IConsultaServico
    {
        IEnumerable<Consulta> ConsultarConsulta();
        Consulta AdicionarConsulta(Consulta p);
        Consulta GetById(int idConsulta);
        Consulta AlterarConsulta(Consulta c);
        void RemoverConsulta(Consulta c);
    }
}
