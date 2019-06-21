

using ConsultorioMedico.Infra.Data.Transacoes;

namespace ConsultorioMedico.Servico.Common
{
    public class Servico
    {
        private readonly IUnitOfWork _unitOfWork;

        public Servico(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public bool Commit()
        { 
            _unitOfWork.Commit();

            return true;
        }

        public void Rollback()
        {
            _unitOfWork.Rollback();
        }
    }
}
