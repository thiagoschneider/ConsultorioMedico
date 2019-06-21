using ConsultorioMedico.Dominio.Entidades;
using ConsultorioMedico.Infra.Data.Extensoes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace ConsultorioMedico.Infra.Data.Persistencia.Mapeamento
{
    public class PacienteMap : EntityTypeConfiguration<Paciente> 
    {

        public override void Map(EntityTypeBuilder<Paciente> builder)
        {
            builder.ToTable("Paciente");
            builder.Property(x => x.DataNascimento).IsRequired();

            builder.Property(x => x.Nome).HasColumnType("varchar(255)").IsRequired();


            builder.HasMany(x => x.Consultas)
                .WithOne(x => x.Paciente).HasForeignKey(x => x.PacienteId);

        }

    }
}
