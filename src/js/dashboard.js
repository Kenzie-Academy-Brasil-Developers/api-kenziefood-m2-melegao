import {Produtos} from '../controller/Produtos.js';



criarCards();

async function criarCards(input) {

    const produtos = await Produtos.listarProdutosEquipe();
    const divCard = document.getElementById('main__section--cards');
    divCard.innerHTML = ``;
    
    produtos.forEach((elem) => {
        
        if (input == 'todos' || input == '' || input == null) {
            
            const cardProduto = document.createElement('div');
            cardProduto.setAttribute('class', 'section__div--card');
            cardProduto.setAttribute('id', elem.id);

            cardProduto.innerHTML = `
                <div class="div__div--cardInicio">
                    <img class="div__img--produto" src="${elem.imagem}" alt="${elem.nome}"/>
                    <div>
                        <h2 class="div__h2--titulo">${elem.nome}</h2>
                    </div>
                </div>
                <div class="div__div--categorias">
                    <span class="div__span--categoria">${elem.categoria}</span>
                </div>
                <div>
                    <p class="div__p--descricao">${elem.descricao}</p>
                </div>
                <div class="div__div--botoes">
                    <button id="${elem.id}" class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-editar.png" alt="Editar" id="editar-${elem.id}"/>
                    </button>
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-excluir.png" alt="Excluir" id="excluir-${elem.id}"/>
                    </button>
                </div>
                `;
                divCard.appendChild(cardProduto);

                let editar = document.getElementById(`${elem.id}`);
                
                editar.addEventListener("click", (event) =>
                
                botaoEditarProduto(event.target.id))
            
        } else if (elem.nome.toLowerCase().includes(input) || elem.categoria.toLowerCase().includes(input)) {

            const cardProduto = document.createElement('div');
            cardProduto.setAttribute('class', 'section__div--card');
            cardProduto.setAttribute('id', elem.id);

            cardProduto.innerHTML = `
                <div class="div__div--cardInicio">
                    <img class="div__img--produto" src="${elem.imagem}" alt="${elem.nome}"/>
                    <div>
                        <h2 class="div__h2--titulo">${elem.nome}</h2>
                    </div>
                </div>
                <div class="div__div--categorias">
                    <span class="div__span--categoria">${elem.categoria}</span>
                </div>
                <div>
                    <p class="div__p--descricao">${elem.descricao}</p>
                </div>
                <div class="div__div--botoes">
                    <button id="${elem.id}" class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-editar.png" alt="Editar" id="editar-${elem.id}"/>
                    </button>
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-excluir.png" alt="Excluir" id="excluir-${elem.id}"/>
                    </button>
                </div>
          
                `
                divCard.appendChild(cardProduto);
                let editar = document.getElementById(`${elem.id}`);
                
                editar.addEventListener("click", (event) =>
                
                botaoEditarProduto(event.target.id))

    
        };
    
    });

}


// let editarProduto = document.getElementsByClassName("div__button--botaoLista")
// editarProduto.addEventListener("click", botaoCriarProduto)

let adicionarNovoProduto = document.getElementById("button--addProduto")
adicionarNovoProduto.addEventListener("click", botaoCriarProduto)

function botaoCriarProduto(event) {
    event.preventDefault();

    let mascaraModalCadastro = document.getElementById("mascaraModalCadastro")

    mascaraModalCadastro.classList.add("body__div--mascaraModalCadastroAtivado")

  }

let botaoModalCadastro = document.getElementById("botaoModalCadastro")  
let botaoModalFechar = document.getElementById("botaoModalFechar")
let digitarModalNome = document.getElementById("div_label--digitarModalNome")
let descricaoModalCadastro = document.getElementById("div__label--descricaoModalCadastro")
let panificadoraModalCadastro = document.getElementById("div_label--panificadoraModalCadastro")
let frutasModalCadastro = document.getElementById("div__label--frutasModalCadastro")
let bebidasModalCadastro = document.getElementById("div__label--bebidasModalCadastro")
let valorModalCadastro = document.getElementById("div__label--valorModalCadastro")
let imagemModalCadastro = document.getElementById("div__label--imagemModalCadastro")

botaoModalCadastro.addEventListener("click", criarProduto)
botaoModalFechar.addEventListener("click", fecharModalAdicionar)    

async function criarProduto(event){

     event.preventDefault();
     let categoriaPanificadora = ""
     let categoriaFrutas = ""
     let categoriaBebidas = ""
     if(panificadoraModalCadastro.checked === true){
        categoriaPanificadora = panificadoraModalCadastro.name
    }if(frutasModalCadastro.checked === true){
        categoriaFrutas = frutasModalCadastro.name
    }if(bebidasModalCadastro.checked === true){
        categoriaBebidas = bebidasModalCadastro.name
    }
    let categoria = categoriaPanificadora + " " + categoriaFrutas + " " + categoriaBebidas

    let arr = categoria.split(" ")

    let nome = digitarModalNome.value
    let descricao = descricaoModalCadastro.value
    let valor = Number(valorModalCadastro.value)
    let imagen = imagemModalCadastro.value
    console.log(panificadoraModalCadastro.checked)
    console.log(frutasModalCadastro.checked)
    console.log(bebidasModalCadastro.checked)

    let data = {
        nome: nome,
        preco : valor,
        categoria : categoria,
        imagem : imagen,
        descricao : descricao,
    }


    const retorno = await Produtos.criarProduto(data)

    if(retorno == 201){

        const modalCadastro = document.getElementById("mascaraModalCadastro")
        modalCadastro.setAttribute("class", "body__div--mascaraModalCadastro" )

        const modalStatus = document.getElementById("StatusAdicionadoModal") 
        modalStatus.setAttribute("class","div__div--StatusAdicionadoModalAtivada")
        setTimeout(function(){
            modalStatus.setAttribute("class", "div__div--StatusAdicionadoModal")
            location.reload()
        },2500 )

    }else{
        const modalCadastro = document.getElementById("mascaraModalCadastro")
        modalCadastro.setAttribute("class", "body__div--mascaraModalCadastro" )

        const modalStatus = document.getElementById("StatusErroModal") 
        modalStatus.setAttribute("class","div__div--StatusErroModalAtivado")
        setTimeout(function(){
            modalStatus.setAttribute("class", "div__div--StatusErroModal")
            location.reload()
        },2500 )
       
    }

}

function fecharModalAdicionar(){
   
    window.location = "/src/pages/dashboard.html"

}



function botaoEditarProduto(id) {

  

    console.log(id)

    // let mascaraModalCadastro = document.getElementById("mascaraModalCadastro")

    // mascaraModalCadastro.classList.add("body__div--mascaraModalCadastroAtivado")

  }