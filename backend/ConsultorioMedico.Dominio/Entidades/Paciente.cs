using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConsultorioMedico.Dominio.Entidades
{
    public class Paciente
    {

        public Paciente(DateTime dataNascimento, string nome)
        {
            DataNascimento = dataNascimento;
            Nome = nome;
        }

        protected Paciente() { }
        public int PacienteId { get; set; }

        public DateTime DataNascimento { get; set; }

        [NotMapped]
        public string DataNascimentoString { get; set; }
        public string Nome { get; set; }
        [JsonIgnore]
        public ICollection<Consulta> Consultas { get; set; }
    }
}
