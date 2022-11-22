<h1 align="center"><b>LANDINGPAGE</b></h1>
<p align="center"><img alt="logo ficticio da LandingPage" title="logo" width="70%" src="./GitImages/logo_white.png"/></p><br>
<p>Este projeto faz parte de um estudo prático da linguagem Csharp, com uso do Framework ASP.NET Core, Entity Core Framework e linguagens front-end como HTML, CSS e Javascript.
A página tem como função captar dados de possíveis clientes e armazena-los em um banco de dados para que possam ser administrados em campanhas de marketing.</p><br>

<p align="center">
<a href="#sobre"><b>Sobre</b></a> •
<a href="#features"><b>Features</b></a> •
<a href="#tecnologias"><b>Tecnologias</b></a> •
<a href="#pre-requisitos"><b>Pré-Requisitos</b></a> •
<a href="#autor"><b>Autor</b></a> 
</p><br>

<h2 id="sobre"><b>Sobre</b></h2>

<p>O layout e a construção da páginas foram pensados de forma a ser uma página única que atraia a intenção do usuário a se cadastrar.</p>
<p>O banco de dados funciona através de migrations que é implementada por ferramentas do Entity Framework.</p>
<p>Para administrar como serão salvo os dados e como serão geridos a aplicação conta com classes de repositório, sendo que cada classe é especifica para manutenção de sua tabela.</p> 
<p>Os objetos que dão os atributos necessários para o funcionamento da aplicação encontram-se na classe modelo, fazendo parte da MODEL no MVC. </p>
<p>Em uma futura versão será adicionada uma DashBoard que vai gerir os dados de forma que o usuário possa identificar a melhor estratégia para vendas.</p><br>

<h2 id="features"><b>Features</b></h2>

<h3><b>Carousel</b></h3>
<p>Um Carousel que alterna as imagens automaticamente.</p>
<br>
<p align="center"><img alt="Galeria carousel" title="carousel" src="./GitImages/carousel.jpg"/></p>
<br>
<h2><b>Formulário</b></h2>
<p>O formulário possui diversas fatures para verificar se os dados estão corretos.</p>
<p>Com o uso de REGEX é possível validar ou não os dados inseridos em cada input</p>
<p align="center"><img alt="formulario input" title="input" src="./GitImages/formulario-input.jpg"/></p>
<br>
<h2><b>Menu Select</b></h2>
<p>Para o carregamento das opções de cidades e estados foi utilizado um import de arquivo Json, assim as opções de cidades que aparecem são relativas a opção de estado selecionado.</p>
<p>Para facilitar a escolha da cidade foi utilizado a tag Datalist.</p>
<p align="center"><img alt="formulario select" title="select" src="./GitImages/formulario-select.jpg"/></p>
<br>
<h2><b>Confirmações</b></h2>
<p>Ao clicar no botão "Enviar" os dados serão enviados como uma asp-action="CadastraCliente", os dados são baseados na @model da classe CLIENTE que gere todos os atributos solicitados no formulário.</p>
<p>O banco de dados aceita quase todas as informações como null exceto "Nome", "Telefone" e "E-mail", sendo que "Telefone" é a primary Key e "E-mail" um index único.</p>
<p>Internamente se as informações forem validadas as informações serão gravadas no banco de dados e será retornado uma string de confirmação, caso o contrário será informado o motivo que impossibilitou o cadastro.</p>
<p align="center"><img alt="formulario confirmação" title="confirmacao" src="./GitImages/formulario-confirmacao.jpg"/></p>
<br>

<h2><b>Erros Esperados</b></h2>
<p>Os erros esperados são os comuns em HTTP como o 500 e 404, ambos serão respondidos pela mesma view que será preenchida com a informação do erro.
<p align="center"><img alt="erros" title="erros" src="./GitImages/erro.gif"/></p>
<br>

<h2 id="tecnologias"><b>Tecnologias</b></h2>

- **`ASP.NET Core`**
- **`CSharp`**
- **`.NET Framework`**
- **`Entity Core Framework`**
- **`HTML 5`**
- **`CSS 3`**
- **`Javascript`**

<p>A base tecnológica da aplicação é o ASP.NET Core, com o uso do MVC e pastas mapeadas para que a aplicação faça a integração entre Movel, View e Controller.</p>
<p>Para o uso do repositório foi utilizado o entity Framework, utilizando-se de migrations para que o banco de dados seja atualizado sem que dados sejam perdidos.</p>
<p>Com o objetivo de demonstrar o uso do ASP.NET poucas classes são criadas, apenas as necessárias para gerir as informações que serão armazenadas no banco de dados e o objeto que vai representar essas classes, sendo este a classe "cliente".</p>
<p>Para responsividade e demais interações visuais foram utilizados técnicas de animação com CSS e Javascript integrados ao HTML.</p><br>

<h2 id="pre-requisitos"><b>Pré-Requisitos</b></h2>

<p>A base funcional da aplicação fica no seguinte diretório "/bin/Release/net6.0/publish/", mas para que a aplicação rode corretamente e necessário possuir um banco de dados e configurá-lo através do arquivo <b>"appsettings.json"</b> e <b>appsettings.production.json</b>:</p>

    "ConnectionStrings": {
      "DefaultConnection": "Server=(localdb)\\mssqllocaldb; Database=LandingPageDB; Trusted_Connection=True; MultipleActiveResultSets=true";
    }

Alterar a <b>DefaultConnection</b> para:

    "Data Source=SEU BANCO DE DADOS; Database=LandingPageDB; Trusted_Connection=True; MultipleActiveResultSets=true; User ID=SEU USER; Password=SUA SENHA"

<p>Para executar a versão geral é necessário que a máquina possua o framework .NET 6 instalado.</p>
<p>Após a conexão estar configurada basta apenas inicializar a aplicação.</p>
<br>

<h2 id="autor"><b>Autor</b></h2>

| [<img src="https://avatars.githubusercontent.com/u/107010683?v=4" width=115><br><sub>Felipe Rodrigues Santos</sub>](https://github.com/FelipeR-S) |  
| :---: |