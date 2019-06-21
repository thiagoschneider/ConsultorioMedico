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
    public class ConsultaMap : EntityTypeConfiguration<Consulta>
    {

        public override void Map(EntityTypeBuilder<Consulta> builder)
        {
            builder.ToTable("Consulta");
            builder.Property(x => x.DataHoraInicio).IsRequired();
            builder.Property(x => x.DataHoraFinal).IsRequired();
            builder.HasKey(s => s.ConsultaId);

            builder.Property(x => x.Observacoes).HasColumnType("varchar(300)").IsRequired(false);


            builder.HasOne(y => y.Paciente)
                .WithMany(x => x.Consultas)
                .HasForeignKey(y => y.PacienteId);


        }
    }




}
