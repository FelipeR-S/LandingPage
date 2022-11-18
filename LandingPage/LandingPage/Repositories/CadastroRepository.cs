using LandingPage.Data;
using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Repositories
{
    /// <summary>
    /// Interface de gerenciamento do banco de dados relativo a tabela de <see cref="Cliente"></see> 
    /// </summary>
    public interface ICadastroRepository
    {
        /// <summary>
        /// Metodo responsável por cadastrar cliente no banco de dados na tabela de <see cref="Cliente"></see> 
        /// </summary>
        /// <param name="novoCliente"></param>
        /// <returns>Retorna <see cref="string"></see> de confirmação de cadasto</returns>
        Task<string> CadastraCliente(Cliente novoCliente);
    }
    public class CadastroRepository : BaseRepository<Cliente>, ICadastroRepository
    {
        public CadastroRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<string> CadastraCliente(Cliente novoCliente)
        {
            // verifica se cliente já existe no DB
            var clienteDB = await _dbSet.Where(c => c.Telefone == novoCliente.Telefone || c.Email == novoCliente.Email).SingleOrDefaultAsync();

            if (clienteDB == null)
            {
                // Grava cliente no banco de dados
                await _dbSet.AddAsync(novoCliente);
                await _context.SaveChangesAsync();
                return "Cadastro concluído";
            }
            else
            {
                // Retorno para quando cliente já está cadastrado
                if (clienteDB.Email == novoCliente.Email && clienteDB.Telefone == novoCliente.Telefone)
                    return "E-mail e telefone já constam nas bases de dados.";
                if (clienteDB.Email == novoCliente.Email)
                    return "E-mail já consta nas bases de dados.";
                else
                    return "Telefone já consta nas bases de dados.";
            }
        }
    }
}
