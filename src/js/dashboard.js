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
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-editar.png" alt="Editar" id="editar-${elem.id}"/>
                    </button>
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-excluir.png" alt="Excluir" id="excluir-${elem.id}"/>
                    </button>
                </div>
                `;
                divCard.appendChild(cardProduto)
            
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
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-editar.png" alt="Editar" id="editar-${elem.id}"/>
                    </button>
                    <button class="div__button--botaoLista">
                        <img src="/src/imagens/dashboard/botao-excluir.png" alt="Excluir" id="excluir-${elem.id}"/>
                    </button>
                </div>
            `
        };
        
    });
    
}
