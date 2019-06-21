using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

using ConsultorioMedico.Dominio.Servicos;
using ConsultorioMedico.Dominio.Repositorios;
using ConsultorioMedico.Servico;
using ConsultorioMedico.Infra.Data.Repositorios;
using ConsultorioMedico.Infra.Data.Transacoes;
using ConsultorioMedico.Infra.Data.Persistencia.Contexto;

namespace ConsultorioMedico.Infra.CrossCutting.IoC
{
    public class NativeInjectorBootstrap
    {
        public static void RegisterServices(IServiceCollection services)
        {
            //Banco de Dados Config
            services.AddScoped<ConsultorioMedicoDbContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //Repositorios
            services.AddScoped<IConsultaRepositorio, ConsultaRepositorio>();
            services.AddScoped<IPacienteRepositorio, PacienteRepositorio>();

            //Servicos
            services.AddScoped<IConsultaServico, ConsultaServico>();
            services.AddScoped<IPacienteServico, PacienteServico>();

  
        }

    }
}
