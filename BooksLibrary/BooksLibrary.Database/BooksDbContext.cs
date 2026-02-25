using Microsoft.EntityFrameworkCore;

namespace BooksLibrary.Database
{
    public class BooksDbContext : DbContext
    {
        public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books => Set<Book>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(b => b.BookId);

                entity.Property(b => b.Title)
                    .HasMaxLength(255)
                    .IsRequired();

                entity.Property(b => b.Authors).IsRequired();
                
                entity.Property(b => b.CreatedAtUtc)
                    .HasDefaultValueSql("NOW() AT TIME ZONE 'utc'")
                    .IsRequired();

                entity.HasIndex(b => b.GoogleBooksId).IsUnique();

            });
        }
    }
}
