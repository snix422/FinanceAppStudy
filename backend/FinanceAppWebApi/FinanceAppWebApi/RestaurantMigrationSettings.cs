using FinanceAppWebApi.Data;
using Microsoft.EntityFrameworkCore;

namespace FinanceAppWebApi
{
    public class RestaurantMigrationSettings
    {
        private readonly FinanceAppDbContext _dbContext;
        public RestaurantMigrationSettings(FinanceAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void updateMigration()
        {
            if (_dbContext.Database.CanConnect())
            {
                var pendingMigrations = _dbContext.Database.GetPendingMigrations();
                if(pendingMigrations != null && pendingMigrations.Any())
                {
                    _dbContext.Database.Migrate();
                }
            }
        }
    }
}
