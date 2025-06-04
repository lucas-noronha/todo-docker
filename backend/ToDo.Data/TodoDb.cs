using Microsoft.EntityFrameworkCore;
using ToDo.Domain;

namespace ToDo.Data
{
    public class TodoDb : DbContext
    {
        public TodoDb(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Todo> ToDo { get; set; }
    }
}
