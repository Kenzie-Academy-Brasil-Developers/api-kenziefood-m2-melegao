import { Produtos } from "../controller/Produtos.js";

criarCards ();
filtroCategoria();
abrirCadastroLogin();
pesquisaDinamica();

async function criarCards (input) {

    const produtos = await Produtos.listarTodosProdutos();

    const divCard = document.getElementById('main__section--container');
    divCard.innerHTML = ``;

    produtos.forEach((elem) => {

        if (input == 'todos' || input == '' || input == null) {
            
            const cardProduto = document.createElement('article');
            cardProduto.setAttribute('class', 'section__article--card');
            cardProduto.setAttribute('id', elem.id);
            
            cardProduto.innerHTML = `
            <img class="article__img--produto" src=${elem.imagem} alt="">
            <h3 class="article__h3--tituloProduto">${elem.nome}</h3>
            <div>
                <p class="article__p--descricaoProduto">${elem.descricao}.</p>
            </div>
            <div class="article__div--categorias">
                <span class="div__span--categoria">${elem.categoria}</span>
            </div>
            <div class="article__div--rodape">
                <h3 class="div__h3--preco">R$ ${elem.preco.toFixed(2).replace('.',',')}</h3>
                <button class="div__button--addCarrinho"> <img src="/src/imagens/botao-carrinho.png" alt="">
                </button>
            </div>
            `;
            
            divCard.appendChild(cardProduto);

        } else if (elem.nome.toLowerCase().includes(input) || elem.categoria.toLowerCase().includes(input)) {
            
            const cardProduto = document.createElement('article');
            cardProduto.setAttribute('class', 'section__article--card');
            cardProduto.setAttribute('id', elem.id);
            
            cardProduto.innerHTML = `
            <img class="article__img--produto" src=${elem.imagem} alt="">
            <h3 class="article__h3--tituloProduto">${elem.nome}</h3>
            <div>
                <p class="article__p--descricaoProduto">${elem.descricao}.</p>
            </div>
            <div class="article__div--categorias">
                <span class="div__span--categoria">${elem.categoria}</span>
            </div>
            <div class="article__div--rodape">
                <h3 class="div__h3--preco">R$ ${elem.preco.toFixed(2).replace('.',',')}</h3>
                <button class="div__button--addCarrinho"> <img src="/src/imagens/botao-carrinho.png" alt="">
                </button>
            </div>
            `;

            divCard.appendChild(cardProduto);
            
        }
        
    });
    
}

function filtroCategoria() {
    
    const categorias = document.getElementById('nav__ul--categorias');
    
    categorias.addEventListener('click', event => {

        const input = event.target.id.toLowerCase();

        criarCards (input);
    });

}

function abrirCadastroLogin() {

    const botoes = document.getElementById('header__div--loginCadastro');

    botoes.addEventListener('click', event => {

        if (event.target.className == 'div__p--cadastro') {
            
            location.replace('/src/pages/cadastro.html');
            
        }
        
        if (event.target.className == 'div__p--login') {
            
            location.replace('/src/pages/login.html');
            
        }
        
    });
    
}

function pesquisaDinamica() {

    const input = document.getElementById('inputPesquisa');

    input.addEventListener('keyup', () => {

        const busca = input.value.toLowerCase();
        
        criarCards (busca);
    })
}
