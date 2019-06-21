using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ConsultorioMedico.Infra.Data.Persistencia.Mapeamento;
using ConsultorioMedico.Dominio.Entidades;
using Microsoft.Extensions.Configuration;
using System.IO;




namespace ConsultorioMedico.Infra.Data.Persistencia.Contexto
{
    public class ConsultorioMedicoDbContext : DbContext
    {
        public ConsultorioMedicoDbContext(DbContextOptions options) : base(options)
        {
        }

        public ConsultorioMedicoDbContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(Configuration.GetConnectionString("ConsultorioMedicoConexao"));
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("ConsultorioMedicoConexao"));
        }

        public DbSet<Consulta> Consultas { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }

    }
}
