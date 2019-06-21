using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConsultorioMedico.Dominio.Entidades
{
    public class Consulta
    {
        public Consulta(DateTime dataHoraInicio, DateTime dataHoraFinal, string observacoes)
        {
            DataHoraInicio = dataHoraInicio;
            DataHoraFinal = dataHoraFinal;
            Observacoes = observacoes;
        }

        protected Consulta()
        {
        }

        public int ConsultaId { get; set; }

        public int PacienteId { get; set; }

        public DateTime DataHoraInicio { get; set; }

        public DateTime DataHoraFinal { get; set; }

        public string Observacoes { get; set; }

        [NotMapped]
        public string HoraInicioString { get; set; }
        [NotMapped]
        public string HoraFinalString { get; set; }
        [NotMapped]
        public string DataString { get; set; }
        [NotMapped]
        public string DataHoraInicioString
        {
            get
            {
                if (DataHoraInicio != null)
                {
                    return DataHoraInicio.ToString("dd/MM/yyyy HH:mm:ss");
                }
                return "";
            }
        }
        [NotMapped]
        public string DataHoraFinalString
        {
            get
            {
                if (DataHoraFinal != null)
                {
                    return DataHoraFinal.ToString("dd/MM/yyyy HH:mm:ss");
                }
                return "";
            }

        }

        public Paciente Paciente { get; set; }
    }
}
