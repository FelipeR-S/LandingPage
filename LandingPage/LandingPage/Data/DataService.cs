using Microsoft.EntityFrameworkCore;

namespace LandingPage.Data
{
    public class DataService : IDataService
    {
        private readonly ApplicationDbContext _context;

        public DataService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task InitDb()
        {
            await _context.Database.MigrateAsync();
        }
    }
}
