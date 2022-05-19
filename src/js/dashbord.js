import { Produtos } from "../controller/Produtos.js";

criarCards ('Todos');
filtroCategoria();
abrirCadastroLogin();
pesquisaDinamica();

async function criarCards (categoria) {

    const produtos = await Produtos.listarTodosProdutos();

    const divCard = document.getElementById('main__section--cards');
    divCard.innerHTML = ``;

    produtos.forEach((elem) => {

        if (categoria == elem.categoria) {

            const cardProduto = document.createElement('section');
            cardProduto.setAttribute('class', 'section__div--card');
            cardProduto.setAttribute('id', elem.id);
            
            cardProduto.innerHTML = `
            <img class="div__img--produto" src=${elem.imagem} alt="">
            <h2 class="div__h2--titulo">${elem.nome}</h2>
            <div class="div__div--categorias">
                <span class="div__span--categoria">${elem.categoria}</span>
            </div>
            <div>
                <p class="div__p--descricao">${elem.descricao}.</p>
            </div>
            
            <div class="div__div--botoes">
                <button class="div__button--botaoLista">
                    <img src="/src/imagens/dashboard/botao-editar.png" alt=""/>
                </button>
                <button class="div__button--botaoLista">
                     <img src="/src/imagens/dashboard/botao-excluir.png" alt=""/>
                </button>
            </div>
            `;
            
            divCard.appendChild(cardProduto);
                
        }
    });

}
