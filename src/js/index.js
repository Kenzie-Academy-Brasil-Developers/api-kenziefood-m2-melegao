import { Produtos } from "../controller/Produtos.js";

criarCards();
filtroCategoria();
abrirCadastroLogin();
pesquisaDinamica();
adicionaEventoModal();

const carrinhoDeProdutos = [];

async function criarCards(input) {

    const produtos = await Produtos.listarTodosProdutos();

    const divCard = document.getElementById('main__section--container');
    divCard.innerHTML = ``;

    produtos.forEach((elem) => {

        if (input == 'todos' || input == '' || input == null) {
            
            const cardProduto = document.createElement('article');
            cardProduto.setAttribute('class', 'section__article--card');
            
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
                <button class="div__button--addCarrinho" id=${elem.id}> <img src="/src/imagens/botao-carrinho.png" alt="">
                </button>
            </div>
            `;
            
            divCard.appendChild(cardProduto);

            const botao = document.getElementById(elem.id);

            botao.addEventListener('click', (event) => {

                event.preventDefault();

                carrinhoDeProdutos.push(elem);

                adicionarAoCarrinho(elem);

            });

        } else if (elem.nome.toLowerCase().includes(input) || elem.categoria.toLowerCase().includes(input)) {
            
            const cardProduto = document.createElement('article');
            cardProduto.setAttribute('class', 'section__article--card');
            
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
                <button class="div__button--addCarrinho" id=${elem.id}> <img src="/src/imagens/botao-carrinho.png" alt="">
                </button>
            </div>
            `;

            divCard.appendChild(cardProduto);

            const botao = document.getElementById(elem.id);

            botao.addEventListener('click', (event) => {

                event.preventDefault();

                adicionarAoCarrinho(elem);

            });
            
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
        
    });
    
}

function adicionarAoCarrinho(produto) {

    const container = document.querySelector('.aside__div--containerProdutoCarrinho');

    const modal = document.querySelector('.div__div--conteudoModalCarrinho');

    container.innerHTML += `
    <div class="aside__div--cardCarrinho">
        <img class="div__img--produtoCarrinho" src=${produto.imagem} alt=${produto.nome}>
        <div class="div__div--resumoProdutoCarrinho">
            <div>
                <h3 class="div__h3--tituloProdutoCarrinho">${produto.nome}</h3>
            </div>
            <span class="div__span--categoriaCarrinho">${produto.categoria}</span>
            <h3 class="div__h3--precoProdutoCarrinho">R$ ${produto.preco.toFixed(2).replace('.',',')}</h3>
        </div>
        <button class="div__button--removerItemCarrinho" id="x${produto.id}">🗑</button>
    </div>
    `;

    modal.innerHTML += `
    <div class="div__div--cardModalCarrinho">
        <img class="div__img--produtoModalCarrinho" src=${produto.imagem} alt=${produto.nome}>>
        <div class="div__div--conteudoModalCarrinho">
            <div>
                <h3 class="div__h3--tituloModalCarrinho">${produto.nome}>a</h3>
            </div>
            <span class="div__span--categoriaModalCarrinho">${produto.categoria}</span>
            <h3 class="div__h3--precoModalCarrinho">R$ ${produto.preco.toFixed(2).replace('.',',')}</h3>
        </div>
        <button class="div__button--botaoExcluirModalCarrinho" id="x${produto.id}">🗑</button>
    </div>
    `;

    atualizarValores();

}

function atualizarValores() {

    const quantidadeDeItens = document.querySelector('.div__h4--quantidadeItens');

    const valorTotal = document.querySelector('.div__h4--valorTotal');

    const quantidadeDeItensModal = document.querySelector('.div__h4--quantidadeModalItens');

    const valorTotalModal = document.querySelector('.div__h4--valorModalTotal');

    let quantidade = 0;

    let precoTotal = 0;

    carrinhoDeProdutos.forEach((produto) => {

        quantidade++;

        precoTotal += produto.preco;

    });

    quantidadeDeItens.innerText = quantidade;

    valorTotal.innerText = `R$ ${precoTotal.toFixed(2).replace('.',',')}`;

    quantidadeDeItensModal.innerText = quantidade;

    valorTotalModal.innerText = `R$ ${precoTotal.toFixed(2).replace('.',',')}`;

}

function adicionaEventoModal() {

    const botaoModal = document.querySelector('.div__div--botaoModalCarrinho');

    botaoModal.addEventListener('click', () => {

        const modal = document.getElementById('div__div--modalCarrinho');

        modal.setAttribute('class', 'div__div--modalCarrinhoAtivado');

    });

    const botaoFechar = document.querySelector('.div__p--fecharModalCarrinho');

    botaoFechar.addEventListener('click', () => {

        const modal = document.getElementById('div__div--modalCarrinho');

        modal.setAttribute('class', 'div__div--modalCarrinho');

    })

}

const aside = document.querySelector('aside');

aside.addEventListener('click', (event) => {

    event.preventDefault();
    
    removerProduto(event.target.id);

});

const containerModal = document.querySelector('.div__div--conteudoModalCarrinho');

containerModal.addEventListener('click', (event) => {

    event.preventDefault();
    
    removerProduto(event.target.id);

});

function removerProduto(idDoProduto) {

    const idFinal = idDoProduto.slice(1,37);

    const index = carrinhoDeProdutos.findIndex((elem) => elem.id == idFinal);

    carrinhoDeProdutos.splice(index, 1);

    const container = document.querySelector('.aside__div--containerProdutoCarrinho');

    container.innerHTML = '';

    const containerModal = document.querySelector('.div__div--conteudoModalCarrinho')

    containerModal.innerHTML = '';

    carrinhoDeProdutos.forEach((produto) => adicionarAoCarrinho(produto));

    verificarCarrinho();

}

function verificarCarrinho() {

    const quantidadeDeItens = document.querySelector('.div__h4--quantidadeItens');

    const valorTotal = document.querySelector('.div__h4--valorTotal');

    const quantidadeDeItensModal = document.querySelector('.div__h4--quantidadeModalItens');

    const valorTotalModal = document.querySelector('.div__h4--valorModalTotal');

    if (carrinhoDeProdutos.length < 1) {

        quantidadeDeItens.innerText = 0;

        valorTotal.innerText = `R$ 0,00`;

        quantidadeDeItensModal.innerText = 0;

        valorTotalModal.innerText = `R$ 0,00`;

    } else {

        atualizarValores();

    }

}