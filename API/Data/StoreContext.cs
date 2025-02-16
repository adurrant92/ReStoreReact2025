using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Product> Products { get; set; }

        public required DbSet<Basket> Baskets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id = "b56f1075-538a-4da1-800e-f2541972021d",  Name ="Member", NormalizedName = "MEMBER"},
                new IdentityRole {Id = "617e9833-4931-49a7-94b7-fcf770df8cdc", Name ="Admin", NormalizedName = "ADMIN"}
            );
        }

        // public DbSet<BasketItem> BasketItems { get; set; }
    }
}