using LandingPage.Models;
using LandingPage.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LandingPage.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ICadastroRepository _cadastroRepository;

        public HomeController(ILogger<HomeController> logger, ICadastroRepository cadastroRepository)
        {
            _cadastroRepository = cadastroRepository;
            _logger = logger;
        }

        public IActionResult LandingPage()
        {
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<string> CadastraCliente(Cliente cliente)
        {           
            return await _cadastroRepository.CadastraCliente(cliente); 
        }
    }
}