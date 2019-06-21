using System;
using System.Collections.Generic;
using System.Text;
using ConsultorioMedico.Infra.Data.Persistencia.Contexto;

namespace ConsultorioMedico.Infra.Data.Transacoes
{
    public class UnitOfWork : IUnitOfWork
    {
 

        private readonly ConsultorioMedicoDbContext _dbContext;
        private bool _disposed;

        public UnitOfWork(ConsultorioMedicoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Commit()
        {
            try
            {
                _dbContext.SaveChanges();

            }
            catch (Exception e)
            {
                //var newException = new FormattedDbEntityValidationException(e);
                throw e;
            }
        }

        public void Rollback()
        {
            //Não faz nada
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            _disposed = true;
        }
    }
}
