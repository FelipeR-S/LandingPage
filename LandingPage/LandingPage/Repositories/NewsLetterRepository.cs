using LandingPage.Data;
using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Repositories
{
    public interface INewsLetterRepository
    {
        Task<string> CadastraEmail(NewsLetter email);
    }
    public class NewsLetterRepository : BaseRepository<NewsLetter>, INewsLetterRepository
    {
        public NewsLetterRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<string> CadastraEmail(NewsLetter email)
        {
            var emailDB = await _dbSet.Where(c => c.Email == email.Email).SingleOrDefaultAsync();

            if (emailDB == null)
            {
                await _dbSet.AddAsync(email);
                await _context.SaveChangesAsync();
                return "Cadastro concluído";
            }
            else return "E-mail já consta nas bases de dados.";
        }
    }
}
