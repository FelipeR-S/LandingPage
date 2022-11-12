using LandingPage.Data;
using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Repositories
{
    public interface ICadastroRepository
    {
        Task<string> CadastraCliente(Cliente novoCliente);
    }
    public class CadastroRepository : BaseRepository<Cliente>, ICadastroRepository
    {
        public CadastroRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<string> CadastraCliente(Cliente novoCliente)
        {
            var clienteDB = await _dbSet.Where(c => c.Telefone == novoCliente.Telefone || c.Email == novoCliente.Email).SingleOrDefaultAsync();

            if(clienteDB == null)
            {
                await _dbSet.AddAsync(novoCliente);
                await _context.SaveChangesAsync();
                return "Cadastro concluído";
            }
            else
            {
                if (clienteDB.Email == novoCliente.Email && clienteDB.Telefone == novoCliente.Telefone)
                    return "E-mail e telefone já consta na base de dados.";
                if (clienteDB.Email == novoCliente.Email)
                    return "E-mail já consta na base de dados.";
                else
                    return "Telefone já consta na base de dados.";
            }
        }
    }
}
