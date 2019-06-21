using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultorioMedico.Infra.Data.Transacoes
{
    public interface IUnitOfWork 
    {
        void Commit();

        void Rollback();
    }
}
