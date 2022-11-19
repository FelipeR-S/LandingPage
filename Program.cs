using LandingPage.Data;
using LandingPage.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Gerencia login no DB
builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

// Cria serviço que vai gerenciar a criação do DB
builder.Services.AddTransient<IDataService, DataService>();
builder.Services.AddTransient<ApplicationDbContext>();

// Cria serviço que gerencia as tabelas de Cadastro de Cliente
builder.Services.AddTransient<ICadastroRepository, CadastroRepository>();
// Cria serviço que gerencia as tabelas de Cadastro de Email de NewsLetter
builder.Services.AddTransient<INewsLetterRepository, NewsLetterRepository>();

var app = builder.Build();

// Gera scope para inicialização do banco de dados
//var scope = app.Services.CreateScope();
//var services = scope.ServiceProvider;

#pragma warning disable CS8602 // Desreferência de uma referência possivelmente nula.
// Inicializa o banco de dados
//services.GetService<IDataService>().InitDb().Wait();
#pragma warning restore CS8602 // Desreferência de uma referência possivelmente nula.

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Define a rota principal como sendo a LandingPage
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=LandingPage}/{id?}");
app.MapRazorPages();

app.Run();
