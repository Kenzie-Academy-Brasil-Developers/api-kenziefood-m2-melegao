import {Produtos} from '../controller/Produtos.js';

criarCards();
pesquisaDinamica();

filtroCategoria();

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
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-editar.png" alt="Editar" id="editar-${elem.id}"/>
                    </button>
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-excluir.png" alt="Excluir" id="excluir-${elem.id}"/>
                    </button>
                </div>
                `;
                
                divCard.appendChild(cardProduto);
                const editar = document.getElementById(`editar-${elem.id}`);
                editar.addEventListener("click", (event) =>
                botaoEditarProduto(event.target.id))

                const apagar = document.getElementById(`excluir-${elem.id}`)
                apagar.addEventListener("click", (event) =>
                botaoExcluirProduto(event.target.id))
            
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
                const editar = document.getElementById(`editar-${elem.id}`);
                
                editar.addEventListener("click", (event) =>
                
                botaoEditarProduto(event.target.id))

    
        };
    
    });

}

function filtroCategoria() {
    
    const categorias = document.getElementById('nav__ul--categorias');
    
    categorias.addEventListener('click', event => {

        const input = event.target.id.toLowerCase();

        criarCards (input);
        
    });

}

function pesquisaDinamica() {

    const input = document.getElementById('inputPesquisa');

    input.addEventListener('keyup', () => {

        const busca = input.value.toLowerCase();
        
        criarCards (busca);
        
    });
    
}

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

    let nome = digitarModalNome.value
    let descricao = descricaoModalCadastro.value
    let valor = Number(valorModalCadastro.value)
    let imagen = imagemModalCadastro.value

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

async function botaoEditarProduto(id) {
    
    const produtos = await Produtos.listarProdutosEquipe()
    const idFinal = id.slice(7,43)
    localStorage.setItem('idDelete', idFinal)
    
    const modal = document.getElementById('macaraModalEditar')
    modal.setAttribute('class', 'body__div--mascaraModalEditarAtivado')

    modal.innerHTML = ``

    const teste = produtos.find((elem) => elem.id == idFinal)


    const divModal = document.createElement('div');

            divModal.setAttribute('class', 'div__div--EditarModalProduto')
            divModal.innerHTML = `
            <div class="div__div--EditarModalCabecalho">
            <h3 class="div__h3--tituloModalEditar">Edição de produto</h3>
            <button class="div__button--botaoModalFechar">X</button>
            </div>

            <form class="div__form--formularioModalEditar" id="formularioEditarProduto" name="${idFinal}">
           <div class="form__div--nomeModalEditar">
               <label class="div_label--digitarModalNome" for="div_label--digitarModalNome">Nome do Produto</label>
               <input name="nome" class="div__input--digitarModalNome" id="div_label--digitarModalNomeNovo" value="${teste.nome}"/>
           </div>

           <div class="form__div--descricaoModalEditar">
               <label class="div__label--descricaoModalEditar" for="div__label--descricaoModalEditar">Descrição</label>
               <input name="descricao" class="div_input--descricaoModalEditar" id="div__label--descricaoModalEditar" value="${teste.descricao}"/>
           </div>

           <h3 class="form__h3--categoriasModalEditar">Categorias</h3>

           <div class="form__div--catedoriasModalEditar">
               <div class="div__input-box--catedoriasModalEditar">
                   <label class="div__label--catedoriasModalEditar"  for="div_label--panificadoraModalEditar">Panificadora</label>
                   <input data-status="false" class="div__input--catedoriasModalEditar div__input--panificadoraModalEditar" type="checkbox" name="Panificadora" id="div_label--panificadoraModalEditar"/>  
               </div>
               <div class="div__input-box--catedoriasModalEditar">
                   <label class="div__label--catedoriasModalEditar"  for="div__label--frutasModalEditar">Frutas</label>
                   <input data-status="false" class="div__input--catedoriasModalEditar div__input--frutasModalEditar" type="checkbox" name="Frutas" id="div__label--frutasModalEditar"/> 
               </div>
               <div class="div__input-box--catedoriasModalEditar">
                   <label class="div__label--catedoriasModalEditar" data-status="false"  for="div__label--bebidasModalEditar">Bebidas</label> 
                   <input data-status="false" class="div__input--catedoriasModalEditar div__input--bebidasModalEditar" type="checkbox" name="Bebidas" id="div__label--bebidasModalEditar"/>  
               </div>
           </div>

           <div class="form__div--valorModalEditar">
               <h3 class="div__h3--valorModalEditar"></h3>
               <label class="div__label--valorModalEditar" for="div__label--valorModalEditar">Valor do produto</label>
               <input name="preco" class="div__input--valorModalEditar" value="${teste.preco}" id="div__label--valorModalEditar"/>
           </div>

           <div class="form__div--imagemModalEditar">
               <label class="div__label--imagemModalEditar" for="div__label--imagemModalEditar">Link da imagem</label>
               <input name="imagem" class="div__input--imagemModalEditar" value="${teste.imagem}" id="div__label--imagemModalEditar"/>    
           </div>

           <button class="div__button--botaoModalExcluir" id="editarExcluir">Excluir</button>
           <button class="div__button--botaoModalEditar">Salvar alteração</button>

        </form>
            `
            modal.appendChild(divModal)

        const formularioEditarProduto = document.getElementById('formularioEditarProduto')
        console.log(formularioEditarProduto)
        formularioEditarProduto.addEventListener('submit', atualizaProduto)

        const editarExcluir = document.getElementById('editarExcluir');
        editarExcluir.addEventListener('click', funcaoEditarExcluir)
    
  }

  function funcaoEditarExcluir (event) {
    event.preventDefault()
    console.log('alo')
    const modal = document.getElementById('mascaraModalApagarExcluir')
    modal.setAttribute('class', 'body__div--mascaraModalApagarExcluirAtivado')

    const botaoSim = document.getElementById('botaoModalApagarExcluirSim')

    botaoSim.addEventListener("click", deletarConfirma) 

    const botaoNao = document.getElementById('botaoModalApagarExcluirNao')
    const botaoFechar = document.getElementById('botaoModalApagarFecharX')
    
    botaoNao.addEventListener("click", cancelaOperacao) 
    botaoFechar.addEventListener("click", cancelaOperacao)


  }

async function atualizaProduto (event) {

event.preventDefault()

let id = document.getElementById('formularioEditarProduto').name

let digitarModalNomeEditar = document.getElementById("div_label--digitarModalNomeNovo")
let descricaoModalEditar = document.getElementById("div__label--descricaoModalEditar")
let panificadoraModalEditar = document.getElementById("div_label--panificadoraModalEditar")
let frutasModalEditar = document.getElementById("div__label--frutasModalEditar")
let bebidasModalEditar = document.getElementById("div__label--bebidasModalEditar")
let valorModalEditar = document.getElementById("div__label--valorModalEditar")
let imagemModalEditar = document.getElementById("div__label--imagemModalEditar")

let editarPanificadora = ""
let editarFrutas = ""
let editarBebidas = ""
if(panificadoraModalEditar.checked === true){
    editarPanificadora = panificadoraModalEditar.name
}if(frutasModalEditar.checked === true){
    editarFrutas = frutasModalEditar.name
}if(bebidasModalEditar.checked === true){
    editarBebidas = bebidasModalEditar.name
}

let categoria = editarPanificadora + " " + editarFrutas + " " + editarBebidas

let nome = digitarModalNomeEditar.value
let descricao = descricaoModalEditar.value
let valor = Number(valorModalEditar.value)
let imagen = imagemModalEditar.value

let data = {
    nome: nome,
    preco : valor,
    categoria : categoria,
    imagem : imagen,
    descricao : descricao,
}

await Produtos.editarProduto(data, id)

location.reload()

}

async function botaoExcluirProduto(id) {
    
    // const produtos = await Produtos.listarProdutosEquipe()
    const idFinal = id.slice(8,44)
    localStorage.setItem('idDelete', idFinal)
    
    console.log(idFinal)
    
    
    const modal = document.getElementById('mascaraModalApagarExcluir')
    modal.setAttribute('class', 'body__div--mascaraModalApagarExcluirAtivado')

    const botaoSim = document.getElementById('botaoModalApagarExcluirSim')

    botaoSim.addEventListener("click", deletarConfirma) 

    const botaoNao = document.getElementById('botaoModalApagarExcluirNao')
    const botaoFechar = document.getElementById('botaoModalApagarFecharX')
    
    botaoNao.addEventListener("click", cancelaOperacao) 
    botaoFechar.addEventListener("click", cancelaOperacao)    
  }


  async function deletarConfirma () {

    await Produtos.deletarProduto()
    localStorage.removeItem('idDelete')
    location.reload()
    
  }

  function cancelaOperacao(){
    localStorage.removeItem('idDelete')
    location.reload()
  }

const botaoLogout = document.getElementById('botaoLogout')
botaoLogout.addEventListener('click', logoutUsuario)

function logoutUsuario() {

    const cancelarLogout = document.getElementById('cancelarLogout');
    cancelarLogout.addEventListener('click', abortarLogout)

    const logoutFuncao = document.getElementById('logoutFuncao')
    console.log('iiii')
    logoutFuncao.setAttribute('class','div__div--logoutModalAtivado')

    const fazerLogout = document.getElementById('fazerLogout')
    fazerLogout.addEventListener('click', finalizarLogout)

}

function finalizarLogout(){
    localStorage.clear();
        setTimeout(function() {
                  window.location.assign("/index.html")
        },      1000);
}

function abortarLogout(){
    location.reload()
  }