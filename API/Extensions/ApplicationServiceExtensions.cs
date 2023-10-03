using Application.Core;
using Application.Events;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration cfg, string corsPolicy)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(options => options.UseSqlite(cfg.GetConnectionString("DefaultConnection")));
            services.AddCors(options => options.AddPolicy(corsPolicy, policy => { policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"); }));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            return services;
        }
    }
}
