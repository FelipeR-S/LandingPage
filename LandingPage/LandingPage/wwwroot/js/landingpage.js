/// Classes

/// Imports
import estadosJson from './estados.json' assert {type: 'json'}
import cidadesJson from './cidades.json' assert {type: 'json'}

/// Static Variables
// Propaganda
const faixas = document.querySelectorAll('.propaganda-fx');

// Info
const sectionInfo = document.querySelector('#info');
const infoGrafico = document.querySelectorAll('.info-progresso');
const infoValor = document.querySelectorAll('.info-valor');
let atualizaGrafico = false;

// Carousel
const carouselNextBtn = document.querySelector('.carousel-btn-right');
const carouselPrevBtn = document.querySelector('.carousel-btn-left');
const carouselLista = document.querySelector('.carousel-lista');
const carouselSlide = Array.from(carouselLista.children);
const carouselNav = document.querySelector('.carousel-nav');
let carouselIndex = [];

// Form Cadastro
const sectionCadastro = document.querySelector('#form');
const AllSelect = document.querySelectorAll('select');
const inputNome = document.querySelector("[name='nome']");
const inputTelefone = document.querySelector("[name='telefone']");
const inputBairro = document.querySelector("[name='bairro']");
const inputEmail = document.querySelector("[name='email']");
const inputIdade = document.querySelector("[name='nascimento']");

const estados = document.querySelector('#form-estado');
const cidades = document.querySelector('#form-cidade');
const btnEnviar = document.querySelector('.form-enviar');
let estadoId;

// Dialog
const dialog = document.querySelector('dialog');
const dialogTxt = document.querySelector('.dialogtxt');
const dialogBtn = document.querySelector('.dialogbtn');

/// Functions

//// SECTION PROPAGANDA /////
function AnimaFaixa() {
    for (var i = 0; i < faixas.length; i++) {
        faixas[i].style.setProperty('transform', 'scaleX(1)');
    }
}

//// SECTION INFO ////
function AlteraValor(index, tempo) {
    let inicio = 0;
    let max = infoValor[index].id.replace('valor-', '');

    let progresso = setInterval(() => {

        if (infoValor[index].textContent.includes('%'))
            infoValor[index].textContent = `${inicio}%`;
        else
            infoValor[index].textContent = `${inicio}`;

        infoGrafico[index].style.background = `conic-gradient(var(--cor-orange) ${inicio * 3.6}deg, rgba(0, 0, 0, 0.3) 0deg)`

        if (inicio == max) {
            clearInterval(progresso);
        }
        inicio++;
    }, tempo);
}

function AtualizaGrafico(scroll) {
    let tempo = 20;
    const sectionTop = sectionInfo.offsetTop;

    if (scroll >= sectionTop - 250 && !atualizaGrafico) {
        AlteraValor(0, tempo);
        AlteraValor(1, tempo);
        AlteraValor(2, tempo);
        atualizaGrafico = true;
    }
}

//// SECTON CAROUSEL ////
// Remove botões de index ao carousel
function RemoveIndexCarousel() {
    if (carouselIndex.length > 1) {
        carouselIndex.forEach((child) => {
            if (!child.classList.contains('current-slide'))
                carouselNav.removeChild(child);
        });
    }
    const currentSlide = carouselLista.querySelector('.current-slide');
    const targetSlide = carouselSlide[0];
    MudaSlide(currentSlide, targetSlide);
}
// adiciona botões de index ao carousel
function AddIndexCarousel() {
    RemoveIndexCarousel();
    let total = carouselSlide.length;
    if (window.innerWidth > 1800) total = carouselSlide.length -1;

    // cria um botão e adicona a div
    for (let i = 1; i < total; i++) {
        let btn = document.createElement("button");
        btn.classList.add("carousel-index");
        carouselNav.appendChild(btn);
    }
    carouselIndex = Array.from(carouselNav.children);
}

// ajusta slides no tamanho correto
function AjustaSlides() {
    // get width of slide
    let carouselSlideWidth = carouselSlide[0].getBoundingClientRect().width;
    let contador = 0;
    carouselSlide.forEach((slide) => {
        // adiciona a mesma width e ajusta o posicionamento
        slide.style.left = carouselSlideWidth * contador + 'px';
        contador++;
    });
}
// Atualiza o slide a ser exibido
function MudaSlide(currentSlide, targetSlide) {
    carouselLista.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

}
// botões
function NextSlide() {
    // Get current e next slide
    const currentSlide = carouselLista.querySelector('.current-slide');
    let index = carouselSlide.findIndex(i => i === currentSlide);
    // movimenta para esquerda
    if (index == carouselIndex.length - 1) NavIndex(0);
    else {
        NavIndex(index + 1);
    }
}
function PrevSlide() {
    // Get current e next slide
    const currentSlide = carouselLista.querySelector('.current-slide');
    let index = carouselSlide.findIndex(i => i === currentSlide);
    // movimenta para esquerda
    if (index == 0) NavIndex(carouselIndex.length - 1);
    else {
        NavIndex(index - 1);
    }
}
function NavIndex(index) {
    const currentSlide = carouselLista.querySelector('.current-slide');
    const targetSlide = carouselSlide[index];

    MudaSlide(currentSlide, targetSlide);
    // Mostra o botão selecionado
    carouselIndex.forEach(i => i.classList.remove('current-slide'));
    carouselIndex[index].classList.add('current-slide');
}

function CarouselAutomatico(){
    let tempo = 5000;
    let automatico = setInterval(() => {
        if (window.innerWidth <= 720) {
            clearInterval(automatico);
        }
        const currentSlide = carouselLista.querySelector('.current-slide');
        let index = carouselSlide.findIndex(i => i === currentSlide) + 1;
        if (index == carouselIndex.length){
            index = 0;
        }
        NavIndex(index);
    }, tempo);
}

//// FIM SECTION CAROUSEL ////

//// SECTION FORM /////
// Input pattern
/// Contato ///
// verifica se o evento keypress está de acordo com o permitido
//Aceita apenas numeros
function checkCharTelefone(e) {
    const char = String.fromCharCode(e.keyCode);
    const padrao = '[0-9]';
    if (char.match(padrao))
        return true;
}
//Aceita apenas letras e espaço
function checkCharNome(e) {
    const char = String.fromCharCode(e.keyCode);
    const padrao = '[A-Za-zÀ-ú]';
    if (char.match(padrao) || char.match(" "))
        return true;
}
// Verifica se input está de acordo com o padrão
function switchPadrao(padrao) {
    let saidaPadrao;
    switch (padrao) {
        case "nome":
            saidaPadrao = "^[A-Za-zÀ-ú(\\s)]{5,50}$";
            break;
        case "email":
            saidaPadrao = "^[\\w\\-\\_\\.]{1,30}[@][\\w\\-\\_]{1,10}[\\.][\\w\\-\\_]{1,10}[\\.]?[\\w]{1,10}?$";
            break;
        case "telefone":
            saidaPadrao = "^[0-9]{10,11}$";
            break;
        default:
            saidaPadrao = "";
            break;
    }
    return saidaPadrao;
}

// Retorna o check correto
function GetCheckCorreto(input) {
    var parent = input.parentNode;
    var correto = parent.querySelector('.fa-check');
    return correto;
}
function GetCheckIncorreto(input) {
    var parent = input.parentNode;
    var incorreto = parent.querySelector('.fa-xmark');
    return incorreto;
}
// Altera as cores do input caso corresponder ou não ao padrão
function PadraoInput(input, inputPadrao) {
    let padrao = switchPadrao(inputPadrao);
    if (!input.value.match(padrao)) {
        input.style.borderColor = "red";
        input.style.color = "red";
        var checkCorreto = GetCheckCorreto(input);
        var checkIncorreto = GetCheckIncorreto(input);
        checkIncorreto.style.setProperty('display', 'block');
        checkCorreto.style.setProperty('display', 'none');
    }
    else {
        input.style.borderColor = "limegreen";
        input.style.color = "white";
        var checkCorreto = GetCheckCorreto(input);
        var checkIncorreto = GetCheckIncorreto(input);
        checkIncorreto.style.setProperty('display', 'none');
        checkCorreto.style.setProperty('display', 'block');
    }
}

// Eventos de espera para click, focusout e change
function InputTXT() {
    inputNome.addEventListener("keypress", (e) => {
        if (!checkCharNome(e))
            e.preventDefault();
    });
    inputNome.addEventListener("change", (e) => {
        PadraoInput(inputNome, 'nome');
    });
    inputBairro.addEventListener("keypress", (e) => {
        if (!checkCharNome(e))
            e.preventDefault();
    });
    inputBairro.addEventListener("change", (e) => {
        PadraoInput(inputBairro, 'nome');
    });
}

function InputMail() {
    inputEmail.addEventListener("change", (e) => {
        PadraoInput(inputEmail, 'email');
    });
}

function InputTel() {
    inputTelefone.addEventListener("keypress", (e) => {
        if (!checkCharTelefone(e))
            e.preventDefault();
    });

    inputTelefone.addEventListener("change", (e) => {
        PadraoInput(inputTelefone, 'telefone');
    });
}

function InputIdade() {
    inputIdade.addEventListener("change", (e) => {
        if (inputIdade.value != "") {
            inputIdade.style.borderColor = "limegreen";
        }
        else
            inputIdade.style.borderColor = "rgba(0, 0, 0, 0.5)";
    });
}

// Form Cadastro SELECT

// Carrega a lista de estados
function CarregaEstados() {
    estadosJson.Estados.forEach((estado) => {
        var option = document.createElement('option');
        option.value = estado.UF;
        option.text = estado.UF;
        option.name = estado.codigo;
        estados.add(option);
    });
}

// Seleciona o grupo de cidades pertencentes ao id de estado informado
function ChangeCidades(id) {
    cidadesJson.Cidades.forEach((cidade) => {
        if (cidade.estadoId == id) {
            var option = document.createElement('option');
            option.text = cidade.nome;
            option.value = cidade.nome;
            cidades.appendChild(option);
        }
    });
}
// Remove cidades de select ao alterar estado

// Get Estado ID
function AlteraCidades() {
    estados.addEventListener('change', (e) => {
        estadoId = estados.options[estados.selectedIndex].name;
        if (cidades.childElementCount > 1) {
            $("#form-cidade").empty();
        }
        ChangeCidades(estadoId);
    });
}

// All Select event
function SelectChange(e) {
    if (IsSelect(e)) {
        if (e.target.value != "select-one") {
            e.target.style.borderColor = "limegreen";
        }
        else
            e.target.style.borderColor = "rgba(0, 0, 0, 0.5)";
    }
}

function CidadeSelected() {
    var parent = cidades.parentNode;
    var input = parent.querySelector('input');
    input.addEventListener('change', () => {
        var arr = Array.from(cidades.options);
        var cidade = arr.find(i => i.value.toLowerCase() == input.value.toLowerCase());
        if (cidade == null) {
            input.style.borderColor = "rgba(0, 0, 0, 0.5)";
            input.value = "";
        }
        else {
            input.value = cidade.value;
            input.style.borderColor = "limegreen";
        }
    });
}

// verifica se o objeto é um SELECT
function IsSelect(e) {
    var e = window.e || e;
    if (e.target.tagName != 'SELECT') return false;
    else return true;
}

/// Verifica se a opção selecionada é default
function IsDefault() {
    AllSelect.forEach((e) => {
        if (e.value == "select-one")
            e.value = "";
    });
    if (inputBairro.style.borderColor == "red") {
        inputBairro.value = "";
    }
}

/// DIALOG

function OpenModal() {
    dialog.showModal();
}

dialogBtn.addEventListener('click', (e) => {
    dialog.close();
});

/// Call Functions

//// Carousel ////
carouselNextBtn.addEventListener('click', (e) => {
    NextSlide();
});

carouselPrevBtn.addEventListener('click', (e) => {
    PrevSlide();
});

carouselNav.addEventListener('click', (e) => {
    const isButton = e.target.closest('button');
    if (!isButton) return;
    const indexClick = carouselIndex.findIndex(i => i === isButton);
    NavIndex(indexClick);
});

CarouselAutomatico();

//// FORM ////
// Carrega select Estado
CarregaEstados();
// Altera Cidades de acordo com o estado selecionado
AlteraCidades();

// Analisa padrões dos inputs
InputTXT();
InputTel();
InputMail();
InputIdade();
CidadeSelected();

// Verifica btn enviar
btnEnviar.addEventListener('click', (e) => {
    IsDefault();
});

// verifica todos os select que foram selecionados
document.addEventListener('change', SelectChange, false);


//// GERAIS ////
// Ação ao carregar a página
window.addEventListener('load', (event) => {
    AnimaFaixa();
    AjustaSlides();
    AddIndexCarousel();
    if (dialogTxt.textContent != null && dialogTxt.textContent != "") {
        $(document).scrollTop(sectionCadastro.offsetTop);
        OpenModal();
    }
});

// Ações durante scroll da página
window.addEventListener('scroll', (e) => {
    AtualizaGrafico(scrollY);
});

// Ações durante mudança de tamanho da página
window.addEventListener('resize', (e) => {
    AjustaSlides();
    AddIndexCarousel();
});