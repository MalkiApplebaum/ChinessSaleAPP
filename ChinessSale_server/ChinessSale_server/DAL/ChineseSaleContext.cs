using Microsoft.EntityFrameworkCore;
using Project.Models;
using System.Reflection.Emit;

namespace project.DAL
{
    public class ChineseSaleContext : DbContext
    {

        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Donor> Donors { get; set; }
        public DbSet<Gift> Gifts { get; set; }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<Sale> Sales { get; set; }

        public ChineseSaleContext(DbContextOptions<ChineseSaleContext> contextOptions) : base(contextOptions)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Set Identity Columns
            modelBuilder.Entity<Category>().Property(c => c.Id).UseIdentityColumn(1, 1);
            modelBuilder.Entity<Customer>().Property(p => p.Id).UseIdentityColumn(1, 1);
            modelBuilder.Entity<Gift>().Property(g => g.Id).UseIdentityColumn(1, 1);
            modelBuilder.Entity<Donor>().Property(d => d.Id).UseIdentityColumn(1, 1);
            modelBuilder.Entity<Manager>().Property(m => m.Id).UseIdentityColumn(1, 1);
            modelBuilder.Entity<Sale>().Property(s => s.Id).UseIdentityColumn(1, 1);


            // Configure Relationships
            modelBuilder.Entity<Gift>()
                        .HasOne(g => g.Donor)
                        .WithMany(d => d.GiftList)
                        .HasForeignKey(g => g.DonorId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Gift>()
                .HasOne(g => g.Category1)
                .WithMany(c => c.GiftList)
                .HasForeignKey(g => g.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sale>()
                .HasOne(s => s.Customer)
                .WithMany(c => c.SaleList)
                .HasForeignKey(s => s.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sale>()
                .HasOne(s => s.Gift)
                .WithMany(g => g.SaleList)
                .HasForeignKey(s => s.GiftId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}


