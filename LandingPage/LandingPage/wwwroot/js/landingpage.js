/// Imports
import estadosJson from './estados.json' assert {type: 'json'}
import cidadesJson from './cidades.json' assert {type: 'json'}

/// Static Variables

// Form Cadastro
const estados = document.querySelector('#form-estado');
const cidades = document.querySelector('#form-cidade');
let estadoId;

/// Functions

// Form Cadastro

function CarregaEstados(){
    estadosJson.Estados.forEach((estado) => {
        var option = document.createElement('option');
       option.value = estado.codigo;
       option.text = estado.UF;
       estados.add(option);        
    });
}

function ChangeCidades(id){
    cidadesJson.Cidades.forEach((cidade) => {
        if(cidade.estadoId == id){
            var option = document.createElement('option');
            var nomeCidade = cidade.nome;

            if(nomeCidade.length > 20){
                var nomeReduzido = nomeCidade.substring(0, 20);
                var nomeReduzido = nomeReduzido + "...";
                nomeCidade = nomeReduzido;
                option.value = cidade.codigo;
                option.text = nomeCidade;
                cidades.add(option);
            }
            else{
                option.value = cidade.codigo;
                option.text = nomeCidade;
                cidades.add(option);
            }
        }   
    });
}
function RemoveCidades(){
    var i, quantidade = cidades.options.length - 1;
    for(i = quantidade; i > 0; i--) {
        cidades.remove(i);
    }
}

/// Call Functions

// Get Estado ID
estados.addEventListener('change', function handleChange(event) {
    estadoId = event.target.value;
    if (cidades.length > 1){
        RemoveCidades();
    }
    ChangeCidades(estadoId);
});

CarregaEstados();


