/// Classes

/// Imports
import estadosJson from './estados.json' assert {type: 'json'}
import cidadesJson from './cidades.json' assert {type: 'json'}

/// Static Variables

// Form Cadastro
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
function GetCheckCorreto(input){
    var parent = input.parentNode;
    var correto = parent.querySelector('.fa-check');
    return correto;
}
function GetCheckIncorreto(input){
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
function InputTXT(){
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

function InputMail(){
    inputEmail.addEventListener("change", (e) => {
        PadraoInput(inputEmail, 'email');
    });
}

function InputTel(){
    inputTelefone.addEventListener("keypress", (e) => {
        if (!checkCharTelefone(e))
            e.preventDefault();
    });

    inputTelefone.addEventListener("change", (e) => {
        PadraoInput(inputTelefone, 'telefone');
    });
}

function InputIdade(){
    inputIdade.addEventListener("change", (e) =>{
        if (inputIdade.value != ""){
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
function AlteraCidades(){
    estados.addEventListener('change', (e) => {
        estadoId = estados.options[estados.selectedIndex].name;  
        if (cidades.childElementCount > 1) {
            $("#form-cidade").empty();
        }
        ChangeCidades(estadoId);
    });
}

// All Select event
function SelectChange(e){
    if (IsSelect(e)){        
        if (e.target.value != "select-one"){
            e.target.style.borderColor = "limegreen";
        }
        else
            e.target.style.borderColor = "rgba(0, 0, 0, 0.5)";
    }
}

function CidadeSelected(){
    var parent = cidades.parentNode;
    var input = parent.querySelector('input');
    input.addEventListener('focusout', () =>{
        var arr = Array.from(cidades.options);
        if(!arr.some(i => i.value.includes(input.value))){
            input.style.borderColor = "rgba(0, 0, 0, 0.5)";
            input.value = "";
        }
        else{
            input.style.borderColor = "limegreen";
        }
    });
}

// verifica se o objeto é um SELECT
function IsSelect(e){
    var e = window.e || e;
    if (e.target.tagName != 'SELECT') return false;
    else return true;
}

/// Verifica se a opção selecionada é default
function IsDefault(){
    
    AllSelect.forEach((e) =>{
        if(e.value == "select-one")
            e.value = "";
    });
}

/// DIALOG

function OpenModal(){
    dialog.showModal();
}

dialogBtn.addEventListener('click', (e) =>{
    dialog.close();
});

/// Call Functions

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
btnEnviar.addEventListener('click', (e) =>{
    IsDefault();
    if(inputBairro.style.borderColor == "red"){
        inputBairro.value = "";
    }
});

// verifica todos os select que foram selecionados
document.addEventListener('change', SelectChange, false);

// Ação ao carregar a página
window.addEventListener('load', (event) => {
   if(dialogTxt.textContent != null && dialogTxt.textContent != ""){
       OpenModal();
   }
});