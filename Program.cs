using AliAhmedMosaTask.Core.IRepositories;
using AliAhmedMosaTask.EF;
using AliAhmedMosaTask.EF.Repositories;
using Microsoft.EntityFrameworkCore;
using NToastNotify;

namespace AliAhmedMosaTask
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddDbContext<ApplicationDbContext>(option =>
                    option.UseSqlServer(builder.Configuration.GetConnectionString("cs"),
                        b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            //When you use repository design pattern without unit of work you have to make service for evry IRepository and its Repository.
            builder.Services.AddTransient(typeof(IBaseRepository<>),typeof(BaseRepository<>));
            builder.Services.AddMvc().AddNToastNotifyToastr(new ToastrOptions()
            {
                ProgressBar = true,
                PositionClass = ToastPositions.TopRight,
                PreventDuplicates = true,
                CloseButton = true,
                TimeOut=2000
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}