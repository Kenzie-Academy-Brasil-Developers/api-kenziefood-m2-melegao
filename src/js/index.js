import { Produtos } from "../controller/Produtos.js"

await Produtos.listarTodosProdutos()

criarCards ()

function criarCards () {

    const divCard = document.getElementById('main__section--container')
    divCard.innerHTML = ``

    Produtos.dataBaseProdutos.forEach((elem) => {
        const cardProduto = document.createElement('article')
        cardProduto.setAttribute('class', 'section__article--card')
        cardProduto.setAttribute('id', elem.id)
        
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
        `
        divCard.appendChild(cardProduto)
    })
}