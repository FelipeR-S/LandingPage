using LandingPage.Data;
using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Repositories
{
    public abstract class BaseRepository<T> where T : BaseModel
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
    }
}
