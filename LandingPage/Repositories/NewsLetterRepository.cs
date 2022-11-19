using LandingPage.Data;
using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Repositories
{
    /// <summary>
    /// Interface de gerenciamento do banco de dados relativo a tabela de <see cref="NewsLetter"></see>
    /// </summary>
    public interface INewsLetterRepository
    {
        /// <summary>
        ///  Metodo responsável por cadastrar emails no banco de dados Tabela <see cref="NewsLetter"></see>
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Retorna <see cref="string"></see> de confirmação de cadasto</returns>
        Task<string> CadastraEmail(NewsLetter email);
    }
    public class NewsLetterRepository : BaseRepository<NewsLetter>, INewsLetterRepository
    {
        public NewsLetterRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<string> CadastraEmail(NewsLetter email)
        {
            // verifica se cliente já existe no DB
            var emailDB = await _dbSet.Where(c => c.Email == email.Email).SingleOrDefaultAsync();

            if (emailDB == null)
            {
                // Grava cliente no banco de dados
                await _dbSet.AddAsync(email);
                await _context.SaveChangesAsync();
                return "Cadastro concluído";
            }
            else return "E-mail já consta nas bases de dados.";
        }
    }
}
