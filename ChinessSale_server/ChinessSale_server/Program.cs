

using Microsoft.EntityFrameworkCore;
using project.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using ChinessSale_server.Models;
using Project.Models;
using ChinessSale_server;
using project.BLL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework and DI services
builder.Services.AddDbContext<ChineseSaleContext>(c => c.UseSqlServer("Data Source=DESKTOP-L9S4R74 ;Initial Catalog=ChinessSale;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=True;"));
builder.Services.AddScoped<ICustomerDAL, CustomerDAL>();
builder.Services.AddScoped<ICustomerervice, Customerervice>();
builder.Services.AddScoped<IPresentDAL, PresentDAL>();
builder.Services.AddScoped<ISaleDAL, SaleDAL>();
builder.Services.AddScoped<ISaleService, SaleService>();
builder.Services.AddScoped<IGiftervice, Giftervice>();
builder.Services.AddScoped<IDonorDAL, DonorDAL>();
builder.Services.AddScoped<IDonorervice, Donorervice>();
builder.Services.AddScoped<ICategoryDAL, CategoryDAL>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IManagerDAL, ManagerDAL>();
builder.Services.AddScoped<IManagerService, ManagerService>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "https://malkiapplebaum.github.io/", "development web site")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Configure Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminUserPolicy",
        p =>
        {
            p.RequireClaim("IsAdmin", "true");
        });
});

// Configure Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
