using LandingPage.Models;
using LandingPage.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Dynamic;

namespace LandingPage.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ICadastroRepository _cadastroRepository;
        private readonly INewsLetterRepository _newsletterRepository;
        private static string _resposta = string.Empty;

        public HomeController(ILogger<HomeController> logger, ICadastroRepository cadastroRepository, INewsLetterRepository newsletterRepository)
        {
            _newsletterRepository = newsletterRepository;
            _cadastroRepository = cadastroRepository;
            _logger = logger;
        }

        /// <summary>
        /// View da página principal LandingPage
        /// </summary>
        /// <returns></returns>
        public IActionResult LandingPage()
        {
            // resposta que será transmitida na view
			ViewData["Resposta"] = _resposta;
            // Apaga a o estado de memória da resposta após a mesma ser transmitida
            _resposta = "";
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

        /// <summary>
        /// Acessa a instacia do <see cref="CadastroRepository"/> e grava a informação no seu respectivo banco de dados caso não for repitido
        /// </summary>
        /// <param name="cliente"></param>
        /// <returns>Gera uma mensagem para o cliente que será transmitida na view</returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CadastraCliente(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                _resposta = await _cadastroRepository.CadastraCliente(cliente);
                return RedirectToAction("LandingPage");
            }
            _resposta = "Informações incorretas no cadastro.\n Favor verificar!";
            return RedirectToAction("LandingPage");
        }

        /// <summary>
        /// Acessa a instacia do <see cref="NewsLetterRepository"/> e grava a informação no seu respectivo banco de dados caso não for repitido
        /// </summary>
        /// <param name="emailcadastro"></param>
        /// <returns>Gera uma mensagem para o cliente que será transmitida na view</returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CadastraNewsLetter(NewsLetter emailcadastro)
        {
            if (ModelState.IsValid)
            {
                _resposta = await _newsletterRepository.CadastraEmail(emailcadastro);
                return RedirectToAction("LandingPage");
            }
            _resposta = "E-mail incorreto.\n Favor verificar!";
            return RedirectToAction("LandingPage");
        }
    }
}