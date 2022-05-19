class CarrinhoPublico {

    static listarCarrinho() {

        const carrinho = [];

        for (let i = 0; i < localStorage.length; i++) {

            carrinho.push({
                idDoProduto: localStorage.key(i),
                quantidade: localStorage.getItem(localStorage.key(i)),
            });

        }

        return carrinho;

    }

    static adicionarAoCarrinho(idDoProduto) {

        const produtoNoCarrinho = localStorage.getItem(idDoProduto);

        if (produtoNoCarrinho == null || produtoNoCarrinho == undefined) {

            localStorage.setItem(idDoProduto, 1);

        } else {

            let quantidadeDoProduto = Number(produtoNoCarrinho) + 1;

            localStorage.setItem(idDoProduto, quantidadeDoProduto);

        }
        
    }

    static deletarDoCarrinho(idDoProduto) {

        let quantidadeDoProduto = Number(localStorage.getItem(idDoProduto)) - 1;

        if (quantidadeDoProduto == 0) {

            localStorage.removeItem(idDoProduto);

        } else {

            localStorage.setItem(idDoProduto, quantidadeDoProduto);

        }

    }

}

export {CarrinhoPublico}